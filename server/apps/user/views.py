from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework.status import HTTP_201_CREATED

# from user.serializers import (UserSerializer, LoginSerializer)
from user.models import User

# from utils.jwt import create_jwt
# from utils.authentication import LoginRequiredAuthentication


class UserViewSet(ModelViewSet):
    """
    用户 API 类
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    authentication_classes = [LoginRequiredAuthentication]
    # permission_classes = []
    # throttle_classes = []

    def get_serializer_context(self):
        """
        更新上下文对象
        对用户做 增删改查 时, 需要确认权限
        """
        context = super().get_serializer_context()
        context.update({'request': self.request})

        return context

    def create(self, request, *args, **kwargs):
        """
        注册用户
        重写 `create` 方法 (在 `serializer` 重写无效)
        使其创建用户后, 携带返回 `token` 令牌
        """

        response = super().create(request, *args, **kwargs)
        response.data['token'] = create_jwt({'uid': response.data['id']})

        return response


class LoginAPIView(APIView):
    """
    登录 API 类
    """
    authentication_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        # 校验 登录数据 合法性
        serializer.is_valid(raise_exception=True)
        # 校验 登录数据 正确性 (错误时会抛出 CustomExeption, 通过 middleware 捕获)
        user = serializer.is_correct()
        # jwt 令牌
        token = create_jwt({'uid': user.id})
        # User模型 反序列化数据
        data = UserSerializer(instance=user).data
        data['token'] = token

        return Response(data)