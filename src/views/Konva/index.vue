<template>
    <a-row style="height: 100%">
        <a-col :span="4" style="height: 100%">
            <div>
                <a-button type="primary">展示</a-button>
                &nbsp
                <a-button type="danger" @click="remove">删除</a-button>
            </div>
            <br/>
            <div>
                <a-radio-group :value="addLineRadio" buttonStyle="solid">
                    <a-radio-button @click="chooseLine" value="1">添加直线</a-radio-button>
                    <a-radio-button @click="chooseLine" value="2">添加虚线</a-radio-button>
                </a-radio-group>
            </div>
            <br/>
            <img src="../../assets/img/konva/gifts.svg" type="img" draggable="true" @dragstart="dragStart($event)"/>
            <img src="../../assets/img/konva/champagne.svg" type="img" draggable="true" @dragstart="dragStart($event)"/>
            <img src="../../assets/img/konva/live-music.svg" type="img" draggable="true"
                 @dragstart="dragStart($event)"/>
            <br/><br/>
            <img src="../../assets/img/konva/font.svg" type="text" draggable="true" @dragstart="dragStart($event)"/>
        </a-col>
        <a-col id="group" :span="20" style="">
            <div @dragover="dragOver($event)" @drop="dragFinished($event)">
                <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown" @mousemove="mousemove"
                         @mouseup="mouseup">
                    <v-layer ref="layer">
                        <v-image v-for="item in v_image" :key="item.name" :config="item"/>
                        <v-text v-for="item in v_text" :key="item.name" :config="item" @dblclick="dblclickText"
                                @transform="transformerText"/>
                        <v-arrow v-for="item in v_arrow" :key="item.name" :config="item"/>
                        <v-transformer ref="transformer" :config="transformerConf"/>
                    </v-layer>
                </v-stage>
            </div>
            <textarea class="editText" ref="editText" v-for="item in editText"
                      :style="item.style">{{item.text}}</textarea>
        </a-col>
    </a-row>
</template>

<script>
    import Vue from 'vue';
    import VueKonva from 'vue-konva';

    Vue.use(VueKonva);
    export default {
        data() {
            return {
                addLineRadio: "",
                stageSize: {
                    width: 1440,
                    height: 700
                },
                v_image: [],
                v_text: [],
                v_arrow: [],
                editText: [],
                editLineName: null,
                selectedShape: {
                    name: "",
                    type: ""
                },
                transformerConf: {}
            };
        },
        methods: {
            chooseLine(e) {
                if (this.addLineRadio != "" && this.addLineRadio == e.target.value) {
                    this.addLineRadio = "";
                } else {
                    this.addLineRadio = e.target.value;
                }
            },
            dragStart(event) {
                this.quitEditText();
                let ele = event.target;
                let eleType = ele.getAttribute("type");
                event.dataTransfer.setData("eleType", eleType);
                if (eleType == "img") {
                    event.dataTransfer.setData("src", ele.src);
                }
            },
            dragOver(event) {
                event.preventDefault();
            },
            dragFinished(event) {
                let eleType = event.dataTransfer.getData("eleType");
                if (eleType == "img") {
                    const image = new window.Image();
                    image.src = event.dataTransfer.getData("src");
                    image.onload = () => {
                        this.v_image.push({
                            x: event.offsetX - 20,
                            y: event.offsetY - 20,
                            image: image,
                            type: "img",
                            name: this.common.uuid(),
                            draggable: true
                        })
                    };
                } else if (eleType == "text") {
                    let oldEvent = {
                        text: '',
                        x: event.offsetX,
                        y: event.offsetY,
                        width: 200,
                        scaleX: 1,
                        fontSize: 20,
                        draggable: true,
                        name: this.common.uuid(),
                        type: "text"
                    };
                    this.editText.push({
                        text: "",
                        oldEvent: oldEvent,
                        style: {
                            top: event.layerY + "px",
                            left: event.layerX + "px",
                            fontSize: "20px",
                            fontFamily: "Arial",
                            lineHeight: 1,
                            width: "200px",
                            height: "40px"
                        }
                    })
                    this.$nextTick(() => {
                        let a = this.editText;
                        let b = this.v_text;
                        let c = this.$refs.editText[0];
                        c.focus();
                        this.$refs.editText[0].addEventListener('keydown', function (e) {
                            // hide on enter
                            // but don't hide on shift + enter
                            if (e.keyCode === 13 && !e.shiftKey) {
                                a.splice(0, 1);
                                oldEvent.text = c.value;
                                if (oldEvent.text != "") {
                                    b.push(oldEvent);
                                }
                            }
                            // on esc do not set value back to node
                            if (e.keyCode === 27) {
                                a.splice(0, 1);
                                if (oldEvent.text != "") {
                                    b.push(oldEvent);
                                }
                            }
                            c.style.height = "auto";
                            c.style.height = c.scrollHeight + 20 + 'px';
                        });
                    })
                }
            },
            saveImg() {
                const transformerNode = this.$refs.transformer.getStage();
                const stage = transformerNode.getStage();
                this.$router.push({
                    path: '/show',
                    query: {
                        data: stage.children[0].children
                    }
                })
            },
            remove() {
                let selectedShapeName = this.selectedShape.name;
                if (selectedShapeName == "") {
                    this.$message.error("请选择组件！");
                    return;
                }
                let data = this.getClickDataGroup();
                let index = data.findIndex(function (ele) {
                    return ele.name == selectedShapeName;
                })
                if (index != -1) {
                    this.selectedShape.name = '';
                    this.updateTransformer();
                    data.splice(index, 1);
                }
            },
            dblclickText(e) {
                let top = e.target.y();
                let left = e.target.x();
                let selectedShapeName = this.selectedShape.name;
                let index = this.v_text.findIndex(function (ele) {
                    return ele.name == selectedShapeName;
                })
                let clickText = this.v_text[index];
                if (index != -1) {
                    this.selectedShape.name = '';
                    this.updateTransformer();
                    this.v_text.splice(index, 1);
                }
                let transform = '';
                let rotation = e.target.rotation();
                let fontSize = e.target.fontSize();
                if (rotation) {
                    transform += 'rotateZ(' + rotation + 'deg)';
                }
                let px = 0;
                // also we need to slightly move textarea on firefox
                // because it jumps a bit
                let isFirefox =
                    navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                if (isFirefox) {
                    px += 2 + Math.round(fontSize / 20);
                }
                transform += 'translateY(-' + px + 'px)';
                this.editText.push({
                    text: clickText.text,
                    oldEvent: clickText,
                    style: {
                        top: top + "px",
                        left: left + "px",
                        fontSize: fontSize + "px",
                        fontFamily: e.target.fontFamily(),
                        lineHeight: e.target.lineHeight(),
                        width: e.target.width() + "px",
                        height: e.target.height() + 20 + "px",
                        transform: transform,
                        transformOrigin: "left top"
                    }
                })

                this.$nextTick(() => {
                    let a = this.editText;
                    let b = this.v_text;
                    let c = this.$refs.editText[0];
                    c.focus();
                    this.$refs.editText[0].addEventListener('keydown', function (e) {
                        // hide on enter
                        // but don't hide on shift + enter
                        if (e.keyCode === 13 && !e.shiftKey) {
                            a.splice(0, 1);
                            clickText.text = c.value;
                            if (clickText.text != "") {
                                b.push(clickText);
                            }
                        }
                        // on esc do not set value back to node
                        if (e.keyCode === 27) {
                            a.splice(0, 1);
                            if (clickText.text != "") {
                                b.push(clickText);
                            }
                        }
                        c.style.height = "auto";
                        c.style.height = c.scrollHeight + fontSize + 'px';
                    });
                })
            },
            transformerText() {
                let selectedShapeName = this.selectedShape.name;
                const transformerNode = this.$refs.transformer.getStage();
                const stage = transformerNode.getStage();
                const selectedNode = stage.findOne('.' + selectedShapeName);

                let data = this.getClickData(selectedShapeName);
                if (data.x == selectedNode.getX()) {
                    data.width = data.width * selectedNode.scaleX();
                    selectedNode.scaleX(1);
                    selectedNode.scaleY(1);
                } else {
                    data.width = data.width * selectedNode.scaleX();
                    selectedNode.scaleY(1);
                }
            },
            handleStageMouseDown(e) {
                this.quitEditText();
                // clicked on stage - cler selection
                if (e.target === e.target.getStage()) {
                    this.selectedShape.name = '';
                    this.updateTransformer();
                    if (this.addLineRadio == "1") {
                        let evt = e.evt;
                        let line = {
                            points: [evt.offsetX, evt.offsetY, evt.offsetX, evt.offsetY],
                            fill: 'black',
                            stroke: 'black',
                            strokeWidth: 5,
                            draggable: true,
                            name: this.common.uuid(),
                            type: "arrow"
                        };
                        this.v_arrow.push(line);
                        this.editLineName = line.name;
                    } else if (this.addLineRadio == "2") {
                        let evt = e.evt;
                        let line = {
                            points: [evt.offsetX, evt.offsetY, evt.offsetX, evt.offsetY],
                            fill: 'black',
                            stroke: 'black',
                            strokeWidth: 5,
                            draggable: true,
                            name: this.common.uuid(),
                            dash: [20],
                            type: "arrow"
                        };
                        this.v_arrow.push(line);
                        this.editLineName = line.name;
                    }
                    return;
                }

                // clicked on transformer - do nothing
                const clickedOnTransformer =
                    e.target.getParent().className === 'Transformer';
                if (clickedOnTransformer) {
                    return;
                }

                // find clicked rect by its name
                this.selectedShape.name = e.target.name();
                this.selectedShape.type = e.target.attrs.type;
                this.updateTransformer();
            },
            mousemove(e) {
                if (this.editLineName) {
                    let editLineName = this.editLineName
                    let index = this.v_arrow.findIndex(function (ele) {
                        return ele.name == editLineName;
                    })
                    let data = this.v_arrow[index];
                    let evt = e.evt;
                    data.points[2] = evt.offsetX;
                    data.points[3] = evt.offsetY;
                    const transformerNode = this.$refs.transformer.getStage();
                    transformerNode.getLayer().batchDraw();
                }
            },
            mouseup() {
                if (this.editLineName) {
                    this.editLineName = null;
                }
                let selectedShapeName = this.selectedShape.name;
                if (selectedShapeName != "") {
                    const transformerNode = this.$refs.transformer.getStage();
                    const stage = transformerNode.getStage();
                    const selectedNode = stage.findOne('.' + selectedShapeName);

                    let data = this.getClickData(selectedShapeName);
                    data.width = selectedNode.attrs.width;
                    data.height = selectedNode.attrs.height;
                    data.x = selectedNode.attrs.x;
                    data.y = selectedNode.attrs.y;
                    data.scaleX = selectedNode.attrs.scaleX;
                    data.scaleY = selectedNode.attrs.scaleY;
                    data.rotation = selectedNode.attrs.rotation;
                }
            },
            updateTransformer() {
                // here we need to manually attach or detach Transformer node
                const transformerNode = this.$refs.transformer.getStage();
                const stage = transformerNode.getStage();

                const selectedNode = stage.findOne('.' + this.selectedShape.name);
                //do nothing if selected node is already attached
                if (selectedNode === transformerNode.node()) {
                    return;
                }

                if (selectedNode) {
                    // attach to another node
                    if (this.selectedShape.type == "text") {
                        this.transformerConf = {
                            enabledAnchors: ['middle-left', 'middle-right'],
                            boundBoxFunc: function (oldBox, newBox) {
                                newBox.width = Math.max(30, newBox.width);
                                return newBox;
                            }
                        };
                    } else if (this.selectedShape.type == "arrow") {
                        this.transformerConf = {
                            enabledAnchors: [],
                        };
                    } else {
                        this.transformerConf = {};
                    }
                    transformerNode.attachTo(selectedNode);
                    this.$nextTick(() => {
                        selectedNode.moveToTop();
                        transformerNode.moveToTop();
                    })
                } else {
                    // remove transformer
                    transformerNode.detach();
                }
                transformerNode.getLayer().batchDraw();
            },
            quitEditText() {
                if (this.editText.length > 0) {
                    this.editText[0].oldEvent.text = this.$refs.editText[0].value;
                    if (this.editText[0].oldEvent.text != "") {
                        this.v_text.push(this.editText[0].oldEvent);
                    }
                    this.editText.splice(0, 1);
                }
            },
            getClickData(selectedShapeName) {
                let data = this.getClickDataGroup();
                let index = data.findIndex(function (ele) {
                    return ele.name == selectedShapeName;
                })
                return data[index];
            },
            getClickDataGroup() {
                let data = null;
                let type = this.selectedShape.type
                if (type == "img") {
                    data = this.v_image;
                } else if (type == "text") {
                    data = this.v_text;
                } else if (type == "arrow") {
                    data = this.v_arrow;
                }
                return data;
            }
        }
    }
</script>

<style scoped>
    #group {
        padding: 0;
        height: 100%;
        overflow: hidden;
        border: #1f2d3d solid 1px;
    }

    .editText {
        position: absolute;
        border: #1dc4e9 solid 2px;
        padding: 2px;
        margin: 0;
        overflow: hidden;
        background: none;
        outline: none;
        resize: none;
    }
    textarea{
        color:black
    }
</style>
