<?php


namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class PostController extends Controller implements HasMiddleware 
{
    public static function middleware(){
        return [
            new Middleware('auth:sanctum',except: ['index, show'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts  = Post::all();
        return response()->json($posts);
    } 

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title'=>'required|max:250',
            'content'=>'required'
        ]);

        $post = $request->user()->posts()->create($fields);
        return response()->json('Post added successfully');
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return [
            'data'=>$post
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('modify',$post);
        $data = $request->validate([
            'title'=>'required|max:250',
            'content'=>'required'
        ]);

        $post->update($data);
        return ['message'=>'Post deleted successfully'];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('modify',$post);
        $post->delete($post);
        return ['message'=>'Post deleted successfully'];
    }
}
