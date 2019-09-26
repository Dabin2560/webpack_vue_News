<template>
  <div class="editPage">
    <!-- 复用的头部 -->
    <EditDataHeader title="编辑资料" />

    <div class="head">
      <!-- 头像 -->
      <img :src="infos.head_img" alt />
      <!-- vant上传组件 把上传组件定位覆盖到头像的上面，设置后透明度0-->
      <van-uploader :after-read="afterRead" class="uploader" />
    </div>

    <div class="editClass">
      <!-- 封装的editClass组件 -->
      <!-- 修改昵称 -->
      <PersonalClassBar data-_left="昵称" :data_right="infos.nickname" @click="show=!show" />
      <!-- 组件的相互组成弹出框 -->
      <van-dialog v-model="show" title="修改昵称" @confirm="changeNickname" show-cancel-button>
        <!-- 使用 ref="nickname" 获取数据 -->
        <van-field :value="infos.nickname" placeholder="请输入用户名" ref="nickname" />
      </van-dialog>
      <!-- 修改密码 -->
      <PersonalClassBar
        data-_left="密码"
        :data_right="infos.password"
        type="password"
        @click="show1=!show1"
      />
      <!-- 弹出组件 -->
      <van-dialog v-model="show1" title="修改密码" @confirm="changePassword" show-cancel-button>
        <van-field :value="infos.password" placeholder ref="password" />
      </van-dialog>
      <!-- 修改性别 -->
      <PersonalClassBar
        data-_left="性别"
        :data_right="infos.gender === 1 ? '男' : '女'"
        @click="show2=!show2"
      />
      <!-- 弹出组件 -->
      <!-- v-model控制显示弹出的组件 -->
      <van-dialog v-model="show2" title="修改性别" @confirm="changeGender" show-cancel-button>
        <!-- v-model控制选中的性别 ✔ -->
        <van-radio-group v-model="genderCache">
          <van-cell-group>
            <van-cell title="男" clickable @click="genderCache = '1'">
              <van-radio slot="right-icon" name="1" />
            </van-cell>
            <van-cell title="女" clickable @click="genderCache = '0'">
              <van-radio slot="right-icon" name="0" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-dialog>
    </div>
  </div>
</template>

<script>
// 引入封装的classBar组件
import PersonalClassBar from "@/components/PersonalClassBar";
import EditDataHeader from "@/components/EditDataHeader";
import { log } from "util";

export default {
  // 注册组件
  components: {
    // EditDataClassBar,
    PersonalClassBar,
    EditDataHeader
  },
  // 数据
  data() {
    return {
      infos: {},
      show: false,
      show1: false,
      show2: false,
      genderCache: "1"
    };
  },
  methods: {
    // 点击左上箭头返回上一页 = @click="$router.back()"
    // goBack(){
    //   this.$router.push("/personal")
    // },
    // 获取本地储存的 token和user_id

    // 修改昵称
    changeNickname() {
      const val = this.$refs.nickname.$refs.input.value;
      // 提交到编辑资料接口
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          nickname: val
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "修改成功") {
          // 替换掉infos的昵称（前端页面保存渲染用的）
          this.infos.nickname = val;
          this.$toast.success(message);
        }
      });
    },
    // 修改密码
    changePassword() {
      const val = this.$refs.password.$refs.input.value;
      // 提交到编辑资料接口
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          password: val
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "修改成功") {
          // 替换掉infos的昵称（前端页面保存渲染用的）
          this.infos.password = val;
          this.$toast.success(message);
        }
      });
    },
    // 修改性别
    changeGender() {
      // console.log(123);
      // const gender = +this.genderCache;
      
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          gender: +this.genderCache
        }
      }).then(res => {
        const { message, gender } = res.data;

        if (message === "修改成功") {
          // 替换掉infos的性别（前端页面保存渲染用的）
          this.infos.gender = gender;
          this.$toast.success(message);
        }
      });
    },

    // 上传图片
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file); //-------------
      // 构造表单数据（因为这个组件数据为表单数据）
      const formData = new FormData();
      // 将这个用append的方法，向里面追加数据
      formData.append("file", file.file);

      // console.log(formData); //-------------
      //
      this.$axios({
        url: "/upload",
        method: "POST",
        // 添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: formData
      }).then(res => {
        // console.log(formData)
        // console.log(res.data); //-------------
        const { data } = res.data;
        // 将获取的路径，保存到本地，渲染链接
        this.infos.head_img = this.$axios.defaults.baseURL + data.url;

        // 再发送请求，将这个图片 url地址，替换到服务器后台
        this.$axios({
          //  接口： /user_update/:id = `/user_update/${localStorage.getItem("user_id")}`  本地储存过的id，需要验证图片id
          url: `/user_update/` + localStorage.getItem("user_id"),
          method: "POST",
          data: {
            // 图片路径= 后台数据data 的url
            head_img: data.url
          },
          // 添加头信息，验证token
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(res => {
          // console.log(res)
          // 赋值解构   如果不解构  需要 res.data.message
          const { message } = res.data;
          if (message === "修改成功") {
            this.$toast.success(message);
          }
        });
      });
    }
  },
  mounted() {
    // console.log(123);
    // 请求接口资料
    this.$axios({
      // 拼接路径 获取后台数据的id  /user/id
      url: "/user/" + localStorage.getItem("user_id"),
      // 添加头信息
      headers: {
        // Authorization授权 将储存到本地的token添加到headers信息中
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      // console.log(res)
      const { data } = res.data;
      // console.log(data)

      if (data) {
        this.infos = data;
        // 如果用户有头像
        if (data.head_img) {
          this.infos.head_img = this.$axios.defaults.baseURL + data.head_img;
        } else {
          // 无，则启用本地静态文件夹的 默认头像
          this.infos.head_img = "./static/profile.jpg";
        }
      } else {
      }
    });
  }
};
</script>

<style scoped lang="less">
.editPage {
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;

    .uploader {
      position: absolute;
      opacity: 0;
    }

    img {
      display: block;
      width: 80 / 360 * 100vw;
      height: 80 / 360 * 100vw;
      border-radius: 50%;
    }
  }

  // 如果要修改第三方组件库的样式时候，需要在前面加上/deep/， 因为组件库的样式不受scoped的影响
  /deep/ .van-uploader__upload {
    width: 90 / 360 * 100vw;
    height: 90 / 360 * 100vw;
    margin: 0 auto;
  }
}
</style>