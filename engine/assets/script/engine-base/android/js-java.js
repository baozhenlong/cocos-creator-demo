cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //JavaScript方法和Java方法
    },

    js: function () {
        //通过反射机制直接在JavaScript中调用Java的静态方法
        //类名---className---包含Java包路径的完整类名
        var className = 'org/cocos2dx/javascript/Test';
        //方法名---methodName---方法本来的名字
        var methodName = 'sum';
        //方法签名---(参数类型)返回值类型   
        //()V---它表示一个没有参数没有返回值的方法
        //(I)V---表示参数为一个int，没有返回值的方法
        //(I)I---表示参数为一个int， 返回值为int的方法
        //(IF)Z---表示参数为一个int和一个float， 返回值为boolean的方法
        //签名I---Java类型int
        //签名F---Java类型float
        //签名Z---Java类型Boolean
        //签名Ljava/lang/String;（有个分号）---Java类型String
        var methodSignature = '(II)I';
        //参数---param1,param2, ...---可以是0个或任意多个
        var param1 = 1;
        var param2 = 2;
        jsb.reflection.callStaticMethod(className, methodName, methodSignature, param1, param2);
    },

    printName: function (name) {},

    java: function () {
        // 在org.cocos2dx.javascript这个包下面写了一个Test类
        // package org.cocos2dx.javascript;
        // import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge; //这个类有一个evalString方法可以执行JS代码       

        // public class Test {

        //     public static void hello(String msg) {
        //         System.out.println(msg);
        //     }

        //     public static int sum(int a, int b) {
        //         return a + b;
        //     }

        //     public static int sum(int a) {
        //         return a + 2;
        //     }

        //     public static void printName() {
        //         m_activity.runOnGLThread(new Runnable() {
        //             @Override
        //             public void run() {
        //                 //                        String str = "false";
        //                 Cocos2dxJavascriptJavaBridge.evalString("console.log(\"HMS------调用js了\")");
        //                 Cocos2dxJavascriptJavaBridge.evalString("cc.vv.jsJava.printName(\"false\")");
        //             }
        //         });
        //     }

        //     public static void printName() {
        //         m_activity.runOnGLThread(new Runnable() {
        //             @Override
        //             public void run() {
        //                 //                        String str = "false";
        //                 Cocos2dxJavascriptJavaBridge.evalString("console.log(\"HMS------调用js了\")");
        //                 Cocos2dxJavascriptJavaBridge.evalString("cc.vv.jsJava.printName('" + object.toString() + "')");
        //             }
        //         });
        //     }

        // }
    }

    // start () {

    // },

    // update (dt) {},
});