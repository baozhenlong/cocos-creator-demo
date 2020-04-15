cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---刚体---组成物理世界的基本对象，带有属性的物体

        //---刚体属性
        //1---质量---通过碰撞组件的密度与大小自动计算得到的
        //需要计算物体应该收到多大的力时，可能需要使用到这个属性
        var mass = rigidbody.getMass();
        //2---移动速度
        //2.1---获取移动速度
        var velocity = rigidbody.linearVelocity;
        //2.2---设置移动速度
        rigidbody.linearVelocity = velocity;
        //2.3---移动速度衰减系数，可以用来模拟空气摩擦力等效果，它会使现有速度越来越慢
        //2.3.1---获取移动速度衰减系数
        var damping = rigidbody.linearDamping;
        //2.3.2---设置移动速度衰减系数
        rigidbody.linearDamping = damping;
        //2.4---有些时候可能会希望获取刚体上某个点的移动速度，比如一个盒子旋转着往前飞，碰到了墙，这时候可能会希望获取盒子在发生碰撞的点的速度，可以通过 getLinearVelocityFromWorldPoint 来获取
        var worldPoint = cc.v2();
        var p = cc.v2();
        //参数p（cc.Vec2）---用来接收返回值---等价于velocity
        var velocity = rigidbody.getLinearVelocityFromWorldPoint(worldPoint, p);
        //3---旋转速度
        //3.1---获取旋转速度
        var velocity = rigidbody.angularVelocity;
        //3.2---设置旋转速度
        rigidbody.angularVelocity = velocity;
        //3.3---旋转速度衰减系数，与移动衰减系数相同
        //3.3.1---获取旋转速度衰减系数
        var velocity = rigidbody.angularDamping;
        //3.3.2---设置旋转速度衰减系数
        rigidbody.angularDamping = velocity;
        //4---旋转，位移，缩放---旋转，位移与缩放是游戏开发中最常用的功能，几乎每个节点都会对这些属性进行设置。而在物理系统中，系统会自动对节点的这些属性与 box2d 中对应属性进行同步
        //注意---1---box2d 中只有旋转和位移，并没有缩放，所以如果设置节点的缩放属性时，会重新构建这个刚体依赖的全部碰撞体。一个有效避免这种情况发生的方式是将渲染的节点作为刚体节点的子节点，缩放只对这个渲染节点作缩放，尽量避免对刚体节点进行直接缩放
        //注意---2---每个物理时间步之后会把所有刚体信息同步到对应节点上去，而处于性能考虑，节点的信息只有在用户对节点相关属性进行显示设置时才会同步到刚体上，并且刚体只会监视他所在的节点，即如果修改了节点的父节点的旋转位移是不会同步这些信息的
        //5---固定旋转
        //做平台跳跃游戏时通常都不会希望主角的旋转属性也被加入到物理模拟中，因为这样会导致主角在移动过程中东倒西歪的，这时可以设置刚体的 fixedRotation 属性
        rigidbody.fixedRotation = true;
        //6---开启碰撞监听
        //只有开启了刚体的碰撞监听，刚体发生碰撞时才会回调到对应的组件上
        rigidbody.enabledContactListener = true;

        //---刚体类型
        //1---Static---静态刚体---零质量，零速度，即不会受到重力或速度影响，但是可以设置他的位置来进行移动
        //2---Dynamic---动态刚体---有质量，可以设置速度，会受到重力影响
        //3---Kinematic---动态刚体---零质量，可以设置速度，不会受到重力的影响，但是可以设置速度来进行移动
        //4---Animated---动画刚体---在 CocosCreator 里多添加了一个类型，从 Kinematic 衍生的类型，主要用于刚体与动画编辑结合使用

        //---刚体方法
        //1---获取或转换旋转位移属性---使用这些 api 来获取世界坐标系下的旋转位移
        //1.1---获取刚体世界坐标值
        //1.1.1---直接获取返回值
        var out = rigidbody.getWorldPosition();
        //1.1.2---通过参数来接收返回值---刚体的 get 方法都提供了 out 参数来接收函数返回值
        var out2 = cc.v2();
        rigidbody.getWorldPosition(out2);
        //1.2---获取刚体世界旋转值
        var rotation = rigidbody.getWorldRotation();
        //1.3---局部坐标与世界坐标转换
        //1.3.1---世界坐标转换到局部坐标
        var localPoint = rigidbody.getLocalPoint(worldPoint);
        localPoint = cc.v2();
        rigidbody.getLocalPoint(worldPoint, localPoint);
        //1.3.2---局部坐标转换到世界坐标
        var worldPoint = rigidbody.getWorldPoint(localPoint);
        worldPoint = cc.v2();
        rigidbody.getLocalPoint(localPoint, worldPoint);
        //1.3.3---局部向量转换为世界向量
        var worldVector = rigidbody.getWorldVector(localVector);
        worldVector = cc.v2();
        rigidbody.getWorldVector(localVector, worldVector);
        //1.3.3---世界向量转换为局部向量        
        var localVector = rigidbody.getLocalVector(worldVector);
        localVector = cc.v2();
        rigidbody.getLocalVector(worldVector, localVector);
        //2---获取刚体质心---当对一个刚体进行力的施加时，一般会选择刚体的质心作为施加力的作用点，这样能保证力不会影响到旋转值
        //2.1---获取本地坐标系下的质心
        var localCenter = rigidbody.getLocalCenter();
        localCenter = cc.v2();
        rigidbody.getLocalCenter(localCenter);
        //2.2---获取世界坐标系下的质心
        var worldCenter = rigidbody.getWorldCenter();
        worldCenter = cc.v2();
        rigidbody.getWorldCenter(worldCenter);
        //3---力与冲量
        //移动一个物体有两种方式
        //---可以施加一个力或者冲量到这个物体上。力会随着时间慢慢修改物体的速度，而冲量会立即修改物体的速度
        //---当然你也可以直接修改物体的位置，只是这看起来不像真实的物理，你应该尽量去使用力或者冲量来移动刚体，这会减少可能带来的奇怪问题。
        //3.1--施加一个力到刚体上指定的点上，这个点是世界坐标系下的一个点
        rigidbody.applyForce(force, point);
        //或者直接施加力到刚体的质心上
        rigidbody.applyForceToCenter(force);
        //3.2---施加一个冲量到刚体上指定的点上，这个点是世界坐标系下的一个点
        rigidbody.applyLinearImpulse(impulse, point);
        //3.3---力与冲量也可以只对旋转轴产生影响， 这样的力叫做扭矩
        // 施加扭矩到刚体上，因为只影响旋转轴，所以不再需要指定一个点
        rigidbody.applyTorque(torque);
        // 施加旋转轴上的冲量到刚体上
        rigidbody.applyAngularImpulse(impulse);
        //4---其他
        // 有些时候需要获取刚体在某一点上的速度时，可以通过 getLinearVelocityFromWorldPoint 来获取，比如当物体碰撞到一个平台时，需要根据物体碰撞点的速度来判断物体相对于平台是从上方碰撞的还是下方碰撞的
        rigidbody.getLinearVelocityFromWorldPoint(worldPoint);

    },

    // start() {},

    // update (dt) {}
});