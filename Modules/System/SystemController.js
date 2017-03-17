/**
 * =========================================================================
 *
 * @file SystemController
 * @description 请在每个页面中的constructor()方法里实例化一个当前controller，逻辑类型方法全部放在controller中
 * =========================================================================
 *
 * @param funcExample()     //示例方法
 * =========================================================================
 *
 * @example 页面constructor()中实例化：
 *                          constructor(props) {
 *                              super(props);
 *                              this.systemController = new SystemController(this);
 *                          }
 *          页面中调用：this.systemController.initStorage();
 *
 * @author linzixiong
 * @date 2017/1/4
 * @version 1.0
 * =========================================================================
 */

export default class SystemController {
    constructor(that) {
        //定义that表示页面的this，可用this.that.state等方式调用页面内容
        this.that = that;
    }

    /**
     * 示例方法
     */
    funcExample() {
        //设置页面state
        this.that.setState({
            name: 'newName'
        });
        //进行页面跳转(循环跳转到自己)
        this.that.props.navigator.push({
            component: this.that
        })
    }
}