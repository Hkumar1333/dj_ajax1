from django.shortcuts import render
from .models import Post
from django.http import JsonResponse
from django.core import serializers
from .forms import PostForm
from profiles.models import Profile
import crispy_forms


def post_list_and_create(request):
    form = PostForm(request.POST or None)

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        if form.is_valid():
            author = Profile.objects.get(user=request.user)
            instance = form.save(commit=False)
            instance.author = author
            instance.save()
            return JsonResponse({'success': True})
        else:
            errors = form.errors
            return JsonResponse({'success': False, 'errors': errors})
    
    context = {'form': form}
    return render(request, 'posts/main.html', context)
