from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'quiz_video.views.home', name='home'),
    url(r'^quiz/', include('quiz.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
