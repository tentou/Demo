var memdb = require('..');
var assert = require('assert');

//BDD风格
describe('memdb', function(){   //描述memdb功能
  beforeEach(function(){        //每个测试用例之前都要清理memdb数据库，保持无状态性
    memdb.clear();              //这个.clear也是在index里定义的
  });

  describe('.save(doc)', function(){        //描述.save()方法的功能
    it('should save the document', function(done){      //期望值   *后边的done说明这个方法是个异步的
      var pet = { name: 'Tobi' };
      memdb.save(pet, function(){
        var ret = memdb.first({ name: 'Tobi' });
        assert(ret == pet);                     //确保找到了pet
        done();         //告诉Mocha你已经完成了这个测试用例了
      });
    });
  });

  describe('.first(obj)', function(){
    it('should return the first matching doc', function(){  //第一个期望
      var tobi = { name: 'Tobi' };
      var loki = { name: 'Loki' };

      memdb.save(tobi);
      memdb.save(loki);

      var ret = memdb.first({ name: 'Tobi' });
      assert(ret == tobi);

      var ret = memdb.first({ name: 'Loki' });
      assert(ret == loki);
    })

    it('should return null when no doc matches', function(){  //第二个期望
      var ret = memdb.first({ name: 'Manny' });
      assert(ret == null);
    })
  })
})
