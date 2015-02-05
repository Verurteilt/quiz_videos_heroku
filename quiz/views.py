from django.shortcuts import render

def vzaar(request):
	return render(request, 'vzaar.html', {})

def vzaar2(request):
	return render(request, 'vzaar2.html', {})
