from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save


class Room(models.Model):
    '''Room model'''

    name = models.CharField(max_length=20, verbose_name='房间名')
    homeowner = models.ForeignKey(
        to='user.User', on_delete=models.CASCADE, verbose_name='房主')
    password = models.CharField(null=True, blank=True, max_length=8, verbose_name='房间密码')
    max_member_count = models.SmallIntegerField(default=8, verbose_name='最大人数')

    class Meta:
        db_table = 'room'
        verbose_name = '房间'
        verbose_name_plural = '房间'

    def __str__(self):
        return f'{self.name}'


@receiver(post_save, sender=Room)
def room_post_save(sender, instance, **kwargs):
    '''房主自动加入该房间'''
    RoomMember.objects.create(room=instance, member=instance.homeowner)

class RoomMember(models.Model):
    '''Room member model'''

    room = models.ForeignKey(
        to='game.Room', on_delete=models.CASCADE, verbose_name='房间成员')
    member = models.ForeignKey(
        to='user.User', on_delete=models.CASCADE, verbose_name='房间成员')

    class Meta:
        db_table = 'room_member'
        verbose_name = '房间成员'
        verbose_name_plural = '房间成员'

    def __str__(self):
        return f'{self.room}'
