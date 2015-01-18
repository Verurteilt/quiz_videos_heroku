from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    url(r'^vzaar/$', 'quiz.views.vzaar', name='vzaar'),
)
