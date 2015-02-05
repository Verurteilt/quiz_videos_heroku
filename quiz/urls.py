from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = patterns('',
    # Examples:
    url(r'^vzaar/$', 'quiz.views.vzaar', name='vzaar'),
    url(r'^vzaar2/$', 'quiz.views.vzaar2', name='vzaar2'),
)

urlpatterns += staticfiles_urlpatterns()

