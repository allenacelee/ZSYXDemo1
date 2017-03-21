/**
 * =========================================================================
 *
 * @file StoreController
 * @description 请在每个页面中的constructor()方法里实例化一个当前controller，逻辑类型方法全部放在controller中
 * =========================================================================
 *
 * @param funcExample()     //示例方法
 * =========================================================================
 *
 * @example 页面constructor()中实例化：
 *                          constructor(props) {
 *                              super(props);
 *                              this.storeController = new StoreController(this);
 *                          }
 *          页面中调用：this.storeController.funcExample();
 *
 * @author linzixiong
 * @date 2017/3/3
 * @version 1.0
 * =========================================================================
 */

//测试数据
import store_evaluate_test from './StoreEvaluate/store_evaluate_test.json'
import store_location_test from './StoreLocation/store_location_test.json'

export default class StoreController {
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

    /**
     * 门店评级列表查询
     * @param searchTypeId
     * @param searchText
     */
    storeEvaluateQuery(searchTypeId, searchText) {
        this.that.setState({
            dataSource: store_evaluate_test.store_evalueate_test,
        })
    }

    /**
     * 门店位置采集列表查询
     * @param searchTypeId
     * @param searchText
     */
    storeLocationQuery(searchTypeId, searchText) {
        this.that.setState({
            dataSource: store_location_test.store_location_test,
        })
    }

    /**
     * 进入门店评级详细页面
     * @param rowData
     */
    goToStoreEvaluateInfo(rowData) {

    }
}
