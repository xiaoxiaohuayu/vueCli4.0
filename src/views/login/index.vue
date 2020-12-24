<template>
  	<div class="login_page">
  <a-form :form="form" @submit="handleSubmit">
      <!-- <svg-icon name='email'></svg-icon> -->
        <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
        <a-input
            v-decorator="[
            'account',
            { rules: [{ required: true, message: '账号' }] },
            ]"
            placeholder="账号"
        >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
        </a-form-item>
        <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
        <a-input
            v-decorator="[
            'password',
            { rules: [{ required: true, message: '密码' }] },
            ]"
            type="password"
            placeholder="密码"
        >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
        </a-form-item>
        <a-form-item>
        <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
            登陆
        </a-button>
        <a-button type="primary"  @click="info()">
            获取
        </a-button>
        </a-form-item>
    </a-form>
  	</div>
</template>

<script>
import { loginFun,infoFun } from '@httpGather'
import { mapActions } from 'vuex'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
	export default {
	    data(){
			return {
                hasErrors,
                form: this.$form.createForm(this, { name: 'horizontal_login' }),
			}
		},
		mounted(){
            this.$nextTick(() => {
            // To disabled submit button at the beginning.
            this.form.validateFields();
            // this.$message.error('This is an error message');
            });
		},
		computed: {

		},
		methods: {
            ...mapActions(['login']),
            userNameError() {
            const { getFieldError, isFieldTouched } = this.form;
            return isFieldTouched('account') && getFieldError('account');
            },
            // Only show error after a field is touched.
            passwordError() {
            const { getFieldError, isFieldTouched } = this.form;
            return isFieldTouched('password') && getFieldError('password');
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                    console.log('账号密码', values);
                        this.$store.dispatch('setLogin',{'account':'admin','password':'123456'}).then((res)=>{
                            console.log(res)
                        }).catch((error)=>{
                            console.log(error)
                        })
                    // loginFun({'account':'admin','password':'123456'}).then((res)=>{
                    // })
                    }
                });
            },
            info(){
                infoFun().then((res)=>{
                    console.log(res)
                })
            }
		},
		watch: {
		}
	}
</script>

<style lang="less" scoped>
.login_page{
    width: 400px;
    height: 600px;
    margin: 0 auto;
}
</style>
