from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.contrib.auth.hashers import make_password


class User(models.Model):
    '''User model'''

    username = models.CharField(max_length=10, unique=True, verbose_name='用户名')
    password = models.CharField(max_length=254, verbose_name='密码')

    ROLE_CHOICES = (
        ('1', 'Gamer'),
        ('2', 'Developer'),
    )
    role = models.CharField(max_length=1, choices=ROLE_CHOICES, default='1', verbose_name='角色')
    # TODO: 默认头像是静态存放于服务器, 购买VIP功能的用户可以上传自定义头像
    avatar = models.CharField(max_length=254, verbose_name='头像')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='注册时间')

    class Meta:
        db_table = 'user'
        verbose_name = '用户'
        verbose_name_plural = '用户'

    def __str__(self):
        return f'{self.username} ({self.role})'

    @property
    def is_authenticated(self):
        """
        Always return True. This is a way to tell if the user has been
        authenticated in templates.
        """
        return True


@receiver(pre_save, sender=User)
def user_pre_save(sender, instance, **kwargs):
    '''保存用户前将密码加密'''
    # pbkdf2_sha256$
    if not instance.password.startswith('pbkdf2_sha256$'):
        instance.password = make_password(instance.password)