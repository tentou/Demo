/**
 * Created by SZ on 2015/4/3.
 */
define(function() {
     function gaga() {
        //��ǰ�����ı�ǩ����ʼֵΪ0
        var index = 0;
        var timer = null;  //����ʱ�����ø���������ʼ��ʼֵ�ǿ�
        //��Ӷ�ʱ�����ı����������

        var tabstop = document.getElementById("tabs_top");
        var tabli = tabstop.getElementsByTagName("li");
        var content = document.getElementById("content");
        var condiv = content.getElementsByTagName("div");
        timer = setInterval(function () {
            index++;
            //console.log(index)
            //console.log()����ӡһ��index++�����鿴һ�£���0һֱ�����ߣ�����Ҫ�ж�������ֻ������4�����������ж���if
            if (index >= tabli.length) {   //��index��Զ��0-4֮��䶯
                index = 0;
            }
            //console.log(index)           �ϱ�����indexֻ��0-4���л�

            for (j = 0; j < tabli.length; j++) {   //ѭ��������ȫ����������ǵ���ʽ
                tabli[j].className = "";
                condiv[j].className = "tabs_content"
            }
            //�����ٸ���굱ǰֵ���classname
            tabli[index].className = "select";//�����tabli[that.id]д��thatҲ��
            //�±����������һ�²�������֤һ��This.id,console.log(This.id),�������undefind����ȡ����ֵ�ģ����Բ�����This����idȡ���������õ���This�ò���������ָ��window��
            condiv[index].className = "tabs_content_show";
            //�ϱ��Ǹ�index�������id�Ļ� �͸��������
        }, 1000)

    }
    gaga();
})


   /* define(function(){
    alert("hehe");
*/

