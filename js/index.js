$(function() {
  // 轮播功能
  var index = 0,
    carouselArr = $('#banner a'),
    dotArr = $('#bannerContainer .dots span'),
    arrow = $('#bannerContainer .arrow'),
    carLen = dotArr.length,
    timer = null;
  // 自动轮播
  autoPlay();
  // 进入轮播区停止轮播
  $('#bannerContainer').mouseenter(function() {
    if (timer) {
      clearInterval(timer);
    }
  })
  // 离开轮播区再次轮播
  $('#bannerContainer').mouseleave(function() {
    autoPlay();
  })
  // 点击导航圆点切换
  dotArr.click(function() {
    index = $(this).index();
    switchImg();
  })
  // 点击箭头切换图片
  arrow.eq(0).click(function() {
      indexChange(false);
      switchImg();
    })
    .next().click(function() {
      indexChange();
      switchImg();
    })
  // 自动轮播函数
  function autoPlay() {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(play, 2000)
  }

  // 切换到下一张图片函数
  function play() {
    indexChange();
    switchImg();
  }
  // 索引加一函数
  function indexChange(bool) {
    if (bool == null) {
      bool = true;
    }
    if (bool) {
      index++;
      if (index >= carLen) {
        index = 0;
      }
    } else {
      index--;
      if (index < 0) {
        index = carLen - 1;
      }
    }
  }
  // 切换图片函数
  function switchImg() {
    switchClass(carouselArr);
    switchClass(dotArr);
  }
  // 给当前图片和圆点设置样式的函数
  function switchClass($one) {
    $one.eq(index).addClass('active')
      .siblings().removeClass('active');
  }

  // 弹窗功能
  var loginBtn = $('#loginBtn'),
  regBtn = $('#regBtn'),
  layer = $('#layer'),
  layerTitleArr = layer.find('.layer-top-header-l div'),
  layerContentArr = layer.find('.layer-top-content-item'),
  layerClose = layer.find('.close') ;
  // 点击按钮弹出登录注册弹窗
  loginBtn.click(function(event){
    showLayer(0);
  });
  regBtn.click(function(event){
    showLayer(1);
  });
  // 点击标签切换界面
  layerTitleArr.each(function(index,ele){
    $(this).click(function(){
      showLayer(index);
    })
  })
  // 点击按钮关闭弹窗
  layerClose.click(function(event) {
    hideLayer();
  });
  // 验证登录注册
  verifyLogin();
  verifyReg()
  // 显示对应弹窗函数
  function showLayer(index){
    layer.show();
    layerTitleArr.removeClass('active')
    .eq(index).addClass('active');
    layerContentArr.removeClass('active')
    .eq(index).addClass('active');
    ;
  }
  // 隐藏弹窗函数
  function hideLayer(index){
    layer.hide();
    layerContentArr.find('input').not('[type="checkbox"]').val('');
    layerContentArr.find('p.err-tip').html('');
  }
  // 登录验证函数
  function verifyLogin(){
    $('#accountLogin').blur(function(event){
      if($(this).val() !=='imooc'){
        $(this).siblings('.err-tip').html('用户名输入有误，只有imooc正确');
      } else {
        $(this).siblings('.err-tip').html('验证通过');
      }
    })
    $('#pwLogin').blur(function(event){
      if($(this).val() !=='imooc'){
        $(this).siblings('.err-tip').html('密码输入有误，只有imooc正确');
      } else {
        $(this).siblings('.err-tip').html('验证通过');
      }
    })
  }
  // 注册验证函数
  function verifyReg(){
    $('#accountReg').blur(function(event){
      if($(this).val() !=='imooc'){
        $(this).siblings('.err-tip').html('用户名已被占用，只有imooc正确');
      } else {
        $(this).siblings('.err-tip').html('验证通过');
      }
    })
    $('#yzm').blur(function(event){
      if($(this).val().toLowerCase() !=='gyyd'){
        $(this).siblings('.err-tip').html('验证码错误');
      } else {
        $(this).siblings('.err-tip').html('验证通过');
      }
    })
  }

  // 导航菜单功能
  var menuList = $('#menu .nav-l-menu-item'),
  subMenu = $('#subMenu'),
  subMenuItems = subMenu.children();
  menuList.mouseenter(function(event) {
    // 鼠标移入修改一级菜单样式
    $(this).addClass('active')
    .siblings().removeClass('active');
    var currentIndex = $(this).index();
    subMenu.show();
    subMenuItems.eq(currentIndex).show()
    .siblings().hide();
    // 记录当前索引
    subMenu.attr('data-index',currentIndex)
  });
  menuList.mouseleave(function(event) {
    // 鼠标移出隐藏子菜单，并修改一级菜单样式
    $(this).removeClass('active');
    subMenu.hide();
    subMenuItems.hide();
  });
  // 移入子菜单时，一级菜单对应项被选中，子菜单保持显示
  subMenu.mouseenter(function(){
    var currentIndex = $(this).attr('data-index');
    subMenu.show();
    subMenuItems.eq(currentIndex).show()
    .siblings().hide();
    // 一级菜单对应项被选中
    menuList.removeClass('active')
    .eq(currentIndex).addClass('active');
  })
  subMenu.mouseleave(function(event) {
    // 鼠标移出隐藏子菜单，并修改一级菜单样式
    $(this).hide().attr('data-index','');
    subMenuItems.hide();
    menuList.removeClass('active');
  });

  // 购物车
  var shopContainer = $('#shopContainer');
  shopContainer.mouseenter(function(){
    // 移入修改按钮样式，显示购物车清单
    var $this = $(this);
    $this.addClass('active')
    .find('.shop-list-container').show();
    // 删除不需要的商品
    $this.find('.shop-list-item .close').click(function(){
      $(this).parent().remove();
    });
  })
  shopContainer.mouseleave(function(event) {
    var $this = $(this);
    $this.removeClass('active')
    .find('.shop-list-container').hide();
  });
  
  // 楼层区切换tab标签以及楼层跳转
  var floorsItem = $('.floors-item');
  // 切换tab标签
  floorsItem.each(function(i,ele){
    var tabTags = $(this).find('.floors-item-header-r-item');
    // 给tab标签绑定事件，点击时激活样式
    tabTags.click(function(event){
      $(this).addClass('active')
      .siblings().removeClass('active');
      $(ele).find('.floors-item-body-item').removeClass('active')
      .eq($(this).index()).addClass('active');
    })
  })
  // 楼层跳转
  // 获取各楼层离网页顶部距离
  var floorsTop =[];
  var floorsTxt = ['服饰','美妆','通讯','电器','数码'];
  floorsItem.each(function(i,ele){
    floorsTop.push($(ele).offset().top);
  })
  // 再往floorsTop记录最后一层底部距离页面顶部距离
  var lastFloorBottom = floorsTop[floorsTop.length-1] + floorsItem.last().height();
  floorsTop.push(lastFloorBottom);
  var floorsNav = $('#floorsNav'),
  floorsNavItems =floorsNav.children() ;
  $(document).scroll(function(event){
    var nowTop =$(window).scrollTop()+$(window).height();
    // 当页面滚动至出现第二次楼层区时，左侧显示出楼层导航
    if(nowTop>floorsTop[1]){
      floorsNav.show();
      // 依据层数调整楼层导航文字
    }
    // 当页面不到第一层时，左侧楼层导航隐藏
    if(nowTop<floorsTop[0]){
      floorsNav.hide();
    }else if(floorsNav.is(':visible')){
      // 如果没有隐藏则按照层数修改文字
      var nowScroll =$(window).scrollTop();
      // 注意这里floorsTop的值多了最后一层底部到网页顶部距离，个数比层数多一
      for(var i =1;i<floorsTop.length;i++){
        // 修改对应层的导航文字
        if(nowScroll<floorsTop[i]){
          // 如果距离小于第n层,则是在第n-1层
          floorsNavItems.each(function(index,ele){
            $(this).html((index+1)+'F').css('color','#ccc');
          })
          .eq(i-1).html(floorsTxt[i-1]).css('color','red');
          break;
        }
      }
    }
  });
  // 点击时跳转
  floorsNavItems.click(function(event){
    $('html').stop().animate({
      scrollTop: floorsTop[$(this).index()]
    },300); 
    return false;
  })

  // 右侧导航特效
  var sidebarRight = $('#sidebarRight'),
  sidebarRightItems = sidebarRight.children();
  // 移入移出时的动画效果
  sidebarRightItems
  .hover(function(event){
    $(this).find('.sidebar-right-item-l')
    .stop().animate({
      left:-60
    });
  },function(event){
    $(this).find('.sidebar-right-item-l')
    .stop().animate({
      left:0
    });
  })
  // 回到顶部
  sidebarRightItems.eq(4).click(function(event){
    $('html').animate({
      scrollTop: 0
    },300);
    return false;
  })
});