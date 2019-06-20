 //商品浏览量
	/**
	*   显示商品浏览排行榜页面
	*/
	public function ranking_store_browse(){
        $this->assign('cate',CategoryModel::getTierList());
		return $this->fetch();
	}

        /*
         
        public static function getTierList($model = null)
         {
            if($model === null) $model = new self(); 
             return UtilService::sortListTier($model->select()->toArray());   //返回分类表里所有数据（分类）
         }

        public static function sortListTier($data, $pid = 0, $field = 'pid', $pk = 'id', $html = '|-----', $level = 1, $clear = true)
         {
                /*
                   这里每次都是拿到所有分类（不包含处理过的分类，因为下面unset了）的数据（避免多次请求数据库）来处理，写死了第一次$pid = 0,因为需要一个开头来进行处理数据（遍历它的子级）
                */
                static $list = [];       //加个static就等同于全局，下次进来时也不会 = [], 应该只是第一次全局没有才赋值的吧
                if ($clear) $list = [];     
                foreach ($data as $k => $res) {
                    if ($res[$field] == $pid) {    //第一次为0
                        $res['html'] = str_repeat($html, $level);  //str_repeat函数可以把 第一个参数按照第二个参数重复拼接多少次，如（'-',4）后，为----
                        $list[] = $res;
                        unset($data[$k]);   //清除掉此次循环的下标指向，但$res还指向着此次循环的下标指向的值
                        self::sortListTier($data, $res[$pk], $field, $pk, $html, $level + 1, false);   //这里第一次的$res[$pk] 为 0 的子级id
                    }
                }
                return $list;
          }
         
        */
	
	public function ranking_store_browse_data(){   //商品浏览排行榜页面之表格数据
        $offset = input('get.page') * 10 - 10;
        $limit = input('get.limit') * 1;
        $serachVal = input('get.serachVal');
        $cate_id =  input('get.cate_id');
     
	    $arrData = StoreProduct::getTierListTwo(null,$offset,$limit,$serachVal, $cate_id);
		
		return array('code' => 0, 'count' =>  StoreProduct::getTierListTwoCount(null,$serachVal, $cate_id), 'msg' => 'xiaoben', 'data' =>  $arrData);
	}

      /*
         
         	public static function getTierListTwo($model = null,$offset = 0,$limit = 10,$serachVal = null,$cate_id = -1)
            {
                if($model === null) $model = new self();
                $model =  $model->field('id,store_name,image');
                if(!empty(trim($cate_id)) && $cate_id != -1) {
                $model = $model->where(self::getPidSqlTwo($cate_id));
                };
                if(!empty($serachVal)){     
                $model = $model->where('store_name','like','%'.$serachVal.'%');
                };

                $storeData =  $model->where('is_del',0)->limit($offset,$limit)->select()->toArray();
            
                foreach($storeData as $key => $val){
                    $storeData[$key]['browerCount'] =  StoreProductFootprint::getListCount($val['id']);   //根据id去查询(足迹)表里有多少个有这样id的数据
                }

                return $storeData;
            }

             protected static function getPidSqlTwo($cateid){

                $ids = CategoryModel::where('pid', $cateid)->column('id');   //根据pid去（分类）查询表里有多少个有这样pid的数据
                $sql = 'cate_id = '.$cateid . ' OR ';
                if($ids) foreach($ids as $v) $sql .=  'cate_id = '.$v . ' OR ';
                $sql .=  'cate_id = -1';
                return $sql;
            }
            
            public static function getTierListTwoCount($model = null,$serachVal,$cate_id = -1)
            {
                if($model === null) $model = new self(); 
                if(!empty(trim($cate_id)) && $cate_id != -1){
                $model = $model->where(self::getPidSqlTwo($cate_id));
                };
                if(!empty($serachVal)) $model = $model->where('store_name','like','%'.$serachVal.'%');
                
                return  $model->where('is_del',0)->count();
            }
         
      */


<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>table模块快速使用</title>
  <link rel="stylesheet" href="{__PLUG_PATH}layui/css/layui.css" media="all">
</head>
<style>
  .layui-table-cell{
    height: 60px !important;
    line-height: 60px !important;
  }
</style>
<body>
 
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
  <legend>商品浏览量规则为：当用户浏览商品时，该商品浏览量记为:1,当该用户下次再预览时就不会记录为2，也就是商品浏览量为：有多少个用户浏览过</legend>
</fieldset>
  
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
  <legend>分类规则为：选中分类后 只能查询当前分类和分类的子级的商品，不能再查询子级的子级</legend>
</fieldset>
 
<div class="layui-card-body">
<form class="layui-form layui-form-pane" action="">
   <div class="layui-form-item">
      <div class="layui-inline">
                                      <label class="layui-form-label">所有分类</label>
                                      <div class="layui-input-block">
                                          <select name="cate_id" lay-filter="test">
                                              <option value=" ">全部</option>
                                              {volist name='cate' id='vo'}
                                              <option value="{$vo.id}">{$vo.html}{$vo.cate_name}</option>
                                              {/volist}
                                          </select>
                                      </div>
      </div>
        
     <div class="layui-inline">
       <label class="layui-form-label">商品名称</label>
       <div class="layui-input-block">
           <input class="layui-input" name="id" id="demoReload" autocomplete="off">
       </div>
     </div>
     
     <div class="layui-inline demoTable">
        <button class="layui-btn">搜索</button>
     </div>
   </div>
</form>
  
<table id="demo" lay-filter="test"></table>
</div>
  
<script src="{__PLUG_PATH}layui/layui.js"></script>
<script>
var xiaoben;
(function (xiaoben) {
    layui.use(['table', 'form'], function () {
        var table = layui.table;
        var form = layui.form;
        var GB_cateId = 1;
        var $ = layui.$;
        var demoReload = $('#demoReload');
        table.render({
            elem: '#demo',
            url: './ranking_store_browse_data' //数据接口
            ,
            page: true //开启分页
            ,
            cols: [[
                    { type: 'numbers', title: '编号', sort: true },
                    { field: 'id', title: '商品id', sort: true },
                    { field: 'image', title: '商品图片', templet: '<p><img class="avatar " style="cursor: pointer; margin: 0px -10px;  width: calc(100% + 20px);  height: calc(100% + 20px);" data-image="{{d.image}}" src="{{d.image}}" alt="{{d.store_name}}"></p>' },
                    { field: 'store_name', title: '商品名字' },
                    { field: 'browerCount', title: '商品浏览量', sort: true }
                ]],
            id: 'testReload'
        });
        form.on('select(test)', function (data) {
            GB_cateId = data.value;
            table.reload('testReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    serachVal: demoReload.val(),
                    cate_id: GB_cateId
                }
            }, 'data');
        });
        $('.demoTable .layui-btn').on('click', function () {
            //执行重载
            table.reload('testReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    serachVal: demoReload.val(),
                    cate_id: GB_cateId
                }
            }, 'data');
            return false; //阻止下一步操作
        });
    });
})(xiaoben || (xiaoben = {}));

</script>
</body>
</html>
