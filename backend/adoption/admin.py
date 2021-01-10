from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _   # 項目の見出しを作る処理
from . import models


# Django管理サイトのレイアウトを設定
class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email']    # メールアドレスでリスト化
    fieldsets = (
        (None, {'fields': ('email', 'password')}),  # 個別ユーザーページで表示する情報を設定
        (_('Company Information'), {'fields': ()}),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (_('Important dates'), {'fields': ('last_login',)}),
    )

    # 管理サイトでユーザーを追加する際に設定する項目
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        }),
    )


# Djangoダッシュボードにモデルを表示させる表記
admin.site.register(models.User, UserAdmin)
admin.site.register(models.Profile)
admin.site.register(models.Dog_Data)
