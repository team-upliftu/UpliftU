# Generated by Django 5.0.4 on 2024-06-25 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_rename_generate_message_answer'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='budget',
            field=models.PositiveIntegerField(default=1, help_text='予算'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='frequency',
            field=models.PositiveIntegerField(default=1, help_text='頻度'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='present_purpose',
            field=models.CharField(default=11, help_text='プレゼントの目的', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='project_name',
            field=models.CharField(default=111, help_text='プロジェクト名', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='receiver',
            name='hobbies',
            field=models.CharField(default=1, help_text='趣味', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='receiver',
            name='receiver_name',
            field=models.CharField(default=1, help_text='名前', max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='receiver',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], help_text='性別', max_length=10),
        ),
        migrations.DeleteModel(
            name='Hobbies',
        ),
    ]
