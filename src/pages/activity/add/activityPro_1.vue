<template>
    <div class="container">
     <div class="model" v-show="model" @click="model = false">
			<div class="model-show">
				<img :src="imageUrl" alt="">
			</div>
		</div>
    <div class="cropper-fixed" v-if="modelShow">
      <div class="cropper-img"> 
      <vueCropper
						ref="cropper2"
						:img="example2.img"
						:autoCrop="example2.autoCrop"
						:autoCropWidth="example2.autoCropWidth"
						:autoCropHeight="example2.autoCropHeight"
            :fixedBox="example2.fixedBox"
					></vueCropper>
      </div>
      <div class="cropper-btn">
        <button @click="outFinish2" class="btncq ">返回</button>
        <button @click="finish2('base64')" class="btncq btncqout">确定</button>
      </div>
    </div>
      <div class="list">
        <p class="lt-title"><span class="require">*</span>活动名称：</p>
        <div class="rg-container">
          <el-input class="small-input add-input no-circle" placeholder="请输入活动名称，限10-24字"></el-input>
          <p class="sub-tip">限10-24字符</p>
        </div>
      </div>
      <div class="list">
        <p class="lt-title"><span class="require">*</span>活动类型：</p>
        <div class="rg-container">
          <el-select 
          v-model="addData.type" 
          class="small-input add-select no-circle" 
          multiple 
          placeholder="请选择活动类型">
            <el-option v-for="item in add.type" :key="item.value" :value="item.label"></el-option>
          </el-select>
          <p class="sub-tip">多选，限1-3项</p>
        </div>
      </div>
      <div class="list">
        <p class="lt-title"><span class="require">*</span>活动描述：</p>
        <div class="rg-container">
          <div>
            <el-button 
            type='primary' 
            class='add-button'
            style="float:left" 
            @click='insertTitle'>插入副标题</el-button>
            <el-button type='primary' class='add-button' @click='insertImg'>插入图片</el-button>
            <input type="file" @change="die" hidden="hidden" class="inputhide">
          </div>
          <div style="clear:both"></div>
          <p class="sub-tip" >限200-5000字符，图片大小≤2M，不超过10张，其中gif图片不超过6张</p>
          <div  class="body-editor">
          <div class="editor" id='editor' ref='editor' contentEditable="true"
            @paste='pasteHtml($event)'>
            <h3>副标题</h3>
            <p>文本</p>
          </div>
          </div>
        </div>
      </div>
      <div class="list">
        <p class="lt-title"><span class="require">*</span>活动图片：</p>
        <div class="rg-container">
          <div class="addImg MinImg">
            <div class="activeImg" v-if="minAddImg"  @mousemove="shanchu=true" @mouseout="shanchu=false" >
              <img  :src="modelSrc" alt=""  />
              <p v-if="shanchu" @click="modelSrc='',minAddImg=false"  class="showshanchu">删除</p>
              <!-- <span v-if="shanchu" @mousemove="shanchu=true" class="iconfont icon-shanchu showshanchu"></span> -->
            </div>
            <div v-if="modelSrc.length<=1" class="addMinImg" @click="addFile(1)" >
              <i class="el-icon-plus"></i>
              <p class="upload-text">添加小封面</p>
            </div>
            <input type="file" id="upload2" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 2)">
            <p class="sub-tip">尺寸：>300x230像素，大小：≤2M，限1张，用于在活动列表中展示</p>
          </div> 
          <div class="addImg maxImg" >
              <div class="line-img" v-for="(item,index) in modelSrcs" :key="index" >
                <div class="activeImg"  @mousemove="showdel(index)" @mouseout="hidedel(index)">
                <img :src="item"  />
                <p class="showshanchu"   v-if="index==shanchus"  @click="delImg(index)">删除</p>
                </div>
              </div>
              <div class="addMaxImg" v-if="modelSrcs.length<10" @click="addFile(2)">
                <i class="el-icon-plus"></i>
                <p class="upload-text">添加大封面</p>
              </div>
            <!-- <input type="file" id="upload2" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 2)"> -->
            <p class="sub-tip" style="clear:both">尺寸：>750x500像素，大小：≤2M，限1-10张，用于在热门活动，推荐位，或活动详情页顶部等位置进行展示。应尽量避免与活动描述中的图片重复</p>
          </div>
          <!-- <div class="upload-list">
           <el-upload
            v-if="dialogImageUrl.length<1"
            :action="upload.url"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            <p class="upload-text">添加小封面</p>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
            <p class="sub-tip">尺寸：>300x230像素，大小：≤2M，限1张，用于在活动列表中展示</p>
          </div>
           <div class="upload-list">
           <el-upload
            :action="upload.url"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload">
            <i class="el-icon-plus"></i>
            <p class="upload-text">添加大封面</p>
            <input type="file" id="upload2" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 2)">
          </el-upload>
          <el-dialog :visible.sync="upload.dialogVisible">
              <img width="100%" :src="upload.imageUrl" alt="">
            </el-dialog>
            <p class="sub-tip">尺寸：>750x500像素，大小：≤2M，限1-5张，用于在热门活动，推荐位，或活动详情页顶部等位置进行展示。应尽量避免与活动描述中的图片重复</p>
          </div>
           -->
        </div>
      </div>
      <div class="list">
        <div class="rg-container">
          <div>
            <el-button type='primary' class='foot-button black-button'>存为草稿</el-button>
            <el-button type='primary' class='foot-button' @click='next'>下一步</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from "jquery";
import vueCropper from "vue-cropper";
export default {
  name: "",
  components: {
    vueCropper
  },
  data() {
    return {
      show:false,//显示裁切框
			model: false,
      modelSrc: [],//小封面图片（1张）
      modelSrcs:[],//大封面图片(多张)
		 	crap: false,
      previews: {},
      imageUrl: "",//遮罩图片
      shanchus:-1,//大封面删除
      shanchu:false,//小封面删除图标
      minAddImg:false,
      isAddFile:'',//是小封面还是大封面
			option: {
				img: '',
				size: 1,
				full: false,
				outputType: 'png',
				canMove: true,
        fixedBox: true,
				original: true,
        canMoveBox: true,
        info:true
			},
			downImg: '#',
      example2: {
        // img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
        img: "",
        info: true,
        size: 1,
        outputType: "jpeg",
        fixedBox: true,
        canScale: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 0,
        autoCropHeight: 0,
        fixed: true,
        // fixedNumber: [30, 23]
      },
      modelShow: false, //裁切中遮罩
      model: false, //裁切后遮罩
      dialogImageUrl: "",
      dialogVisible: false,
      txtimg: "",
      name: "",
      upload: {
        head: {
          appId: "com.smk.test.test",
          token: "123456"
        },
        data: {
          type: "list",
          base64FileStr: "123132"
        },
        url:
          "http://192.168.23.200:8086/smk_city_activity/extBase64FileUpload.ext",
        // url:'http://192.168.161.74:8081/smk_city_activity/activity/htmActivityImgUpload.htm',
        imageUrl: "",
        dialogVisible: false
      },
      add: {
        type: [
          { value: "0", label: "类型1" },
          { value: "1", label: "类型2" },
          { value: "2", label: "类型3" }
        ]
      },
      addData: {}
    };
  },
  methods: {
    addFile(i){
      //i 区分是添加小封面还是大封面 (1小2大)
      // i==1?this.isAddFile=1:this.isAddFile=2
      this.isAddFile=i
      if(i==1){
        this.example2.autoCropWidth=300
        this.example2.autoCropHeight=230
      }else if(i==2){
        this.example2.autoCropWidth=750
        this.example2.autoCropHeight=500
      }
      var upload2=$('#upload2');
      upload2.trigger('click')
      // console.log(this.isAddFile)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    finish2 (type) {
      console.log(this.isAddFile)
			this.$refs.cropper2.getCropData((data) => {
        this.model = true
        
        this.imageUrl = data
				// this.model = false
				// this.modelSrc = data
        // this.show = false
        this.modelShow=false
        setTimeout(()=>{
          this.model=false
          if(this.isAddFile===1){
          this.modelSrc=this.imageUrl
          this.minAddImg=true
          }else if(this.isAddFile ===2){
          this.modelSrcs.push(this.imageUrl)
          }
        },300)
				// console.log(this.modelSrc)//图片路径
			})
    },
    outFinish2(){
      console.log(1)
      this.modelShow=false
      // this.imageUrl='';
    },
    showdel(i){
      this.shanchus=i
      // console.log( this.shanchus)
    },
    hidedel(i){
      this.shanchus = -1
    },
    delImg(i){
      //大封面删除
      this.modelSrcs.splice(i,1)
      console.log(this.modelSrcs)
      // console.log(i)
    },
    uploadImg (e, num) {
			//上传图片
			// this.option.img
			var file = e.target.files[0]
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				 return false
			 }
			var reader = new FileReader()
			reader.onload = (e) => {
				let data
				if (typeof e.target.result === 'object') {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} else {
					data = e.target.result
				}
				if (num === 1) {
					this.option.img = data
				} else if (num === 2) {
					this.example2.img = data
				}
			}
			// 转化为base64
			// reader.readAsDataURL(file)
			// 转化为blob
			reader.readAsArrayBuffer(file)
      // this.show = true
      this.modelShow = true
		},
    handlePictureCardPreview(file) {
      console.log(1);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;

      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(this.dialogImageUrl)
      // 转化为blob
      reader.readAsArrayBuffer(this.dialogImageUrl);
      this.modelShow = true;
      console.log(this.modelShow);
    },
    uploadSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    insertTitle() {
      let sel, range;
      sel = window.getSelection();
      this.$refs.editor.focus();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        this.$prompt("请输入标题", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^.{1,20}$/,
          inputErrorMessage: "标题字数在1~20之间"
        }).then(({ value }) => {
          let el = document.createElement("div");
          el.innerHTML = "<h3>" + value + "</h3>\r\n";
          let frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          console.log(range);
          range.insertNode(frag);
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        });
      }
    },
    pasteHtml(event) {
      var e = event || window.event;
      e.preventDefault();
      var text =
        (e.originalEvent || e).clipboardData.getData("text/plain") ||
        prompt("请在这里粘贴");
      document.execCommand("insertText", false, text);
    },
    die(e) {
      var file = e.srcElement.files[0];
      var imgURL = window.URL.createObjectURL(file); // imgURL就是你的图片的本地路径，两部就能解决问题
      this.txtimg = imgURL;
      let sel, range;
      sel = window.getSelection();
      this.$refs.editor.focus();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        let el = document.createElement("div");
        el.innerHTML = '<img width="50%" src=' + this.txtimg + ">";
        let frag = document.createDocumentFragment(),
          node,
          lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        console.log(range);
        range.insertNode(frag);
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    },
    insertImg() {
      var _inputhide = $(".inputhide");
      _inputhide.trigger("click");
    },
    next() {
      this.$router.push({ name: "ActivityPro2" });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.container {
  width: 600px;
  position: relative;
}
.list {
  width: 100%;
  padding: 10px 0;
  padding-left: 100px;
  position: relative;
}
.lt-title {
  color: #333;
  font-size: 14px;
  line-height: 36px;
  margin-top: 10px;
  padding-left: 10px;
  position: absolute;
  top: 0;
  left: 0;
  .require {
    color: #d0021b;
    padding: 0 2px;
  }
}
.rg-container {
  width: 100%;
}

.add-input {
  height: 36px;
}
.add-select {
  width: 100%;
  height: 36px;
}
.add-button {
  border-radius: 2px;
  background: linear-gradient(
    127.4deg,
    rgba(255, 79, 90, 1),
    rgba(255, 118, 86, 1)
  );
}
.body-editor {
  height: 360px;
}
.editor {
  width: 100%;
  // min-height: 360px;
  height: 360px;
  border: 1px solid #dedede;
  outline: none;
  padding: 10px;
  overflow-y: scroll;
}
.upload-list {
  position: relative;
  padding-bottom: 20px;
}
.upload-text {
  margin-top: -45px;
  font-size: 14px;
  color: #666;
  line-height: 0;
  text-align: center;
}

.sub-tip {
  font-size: 12px;
  color: #999;
  line-height: 30px;
}

.foot-button {
  border-radius: 2px;
  width: 120px;
  height: 50px;
  background-color: linear-gradient(
    127.4deg,
    rgba(255, 79, 90, 1),
    rgba(255, 118, 86, 1)
  );
  &.black-button {
    border-color: #4a4a4a;
    background-color: #4a4a4a;
  }
}
.min-upload {
  .el-upload-list__item {
    width: 128px !important;
    height: 128px !important;
  }
}
.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}
.cropper-fixed {
  width: 100%;
  opacity: 1;
  height: 100%;
  max-height: 768px;
  position: fixed;
  top: 0%;
  left: 0%;
  bottom: 0;
  right: 0;
  z-index: 99;
  .cropper-img {
    height: 90%;
  }
  .cropper-btn {
    background: rgba(255,255,255,1);
    text-align: center;
    height: 10%;
  }
}
.addImg{
  display: block;
}
.addMinImg,.addMaxImg {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 128px;
  height: 128px;
  line-height: 128px;
  vertical-align: top;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: 0;
}
.model {
		position: fixed;
		z-index: 10;
		width: 100vw;
		height: 100vh;
		overflow: auto;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.8);
	}

	.model-show {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
	}

	.model img {
		display: block;
		margin: auto;
		max-width: 80%;
		user-select: none;
		background-position: 0px 0px, 10px 10px;
		background-size: 20px 20px;
   		background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
	}
.btncq{
		width:65px;
		height:32px;
		background:rgba(74,74,74,1);
		color: #fff;
		font-size: 14px;
		border-radius:4px;
		line-height: 32px;
		text-align: center;
    border:none;
    margin: 10px;
	}
	.btncqout{
		background:linear-gradient(127.4deg,rgba(255,79,90,1),rgba(255,118,86,1));
  }
  .MinImg,.line-img{
    img{
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
      width: 128px;
      height: 128px;
    }
  }
  .line-img{
    .activeImg{
      width: 128px;
      height: 128px;
      margin-right: 10px;
      margin-bottom: 10px;
      float: left;
    }
  }
  .activeImg{
    width: 128px;
    height: 128px;
    position: relative;
    .showshanchu{
      background:rgba(0,0,0,0.4);
      position: absolute;
      width: 100%;
      height: 36px;
      line-height: 36px;
      text-align: center;
      color:#fff;
      opacity: 0.8;
      bottom:0;
      left:0;
      z-index: 9;
      cursor: pointer;
    }
  }
  .vue-cropper{
    background-image: none;
  }
  
</style>
<style scoped lang="less">
#editor {
  color: #666;
  font-size: 14px;
}
#editor h3 {
  color: #333;
  font-size: 16px;
  font-weight: bold;
}
</style>
