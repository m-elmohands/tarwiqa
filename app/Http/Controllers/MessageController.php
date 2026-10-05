<?php

namespace App\Http\Controllers;

use App\Contracts\Services\MessagingServiceInterface;
use App\Http\Requests\Messages\SendMessageRequest;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class MessageController extends Controller
{
    public function __construct(private readonly MessagingServiceInterface $messages) {}

    public function index(): View
    {
        $adminId = request()->user()->id;

        return view('messages.index', [
            'conversations' => $this->messages->inbox(request()->user()),
            'metrics' => [
                'total_messages' => Message::count(),
                'unread' => (int) DB::table('conversation_participants')->where('user_id', $adminId)->whereNull('last_read_at')->count(),
                'pending_replies' => (int) DB::table('conversation_participants')->where('user_id', $adminId)->whereNull('last_read_at')->count(),
                'starred_threads' => 0,
                'junk' => Message::where('type', 'junk')->count(),
            ],
        ]);
    }

    public function create(): View
    {
        return view('messages.create', ['recipients' => $this->messages->recipients()]);
    }

    public function store(SendMessageRequest $request): RedirectResponse
    {
        $this->messages->send($request->user(), $request->validated());

        return to_route('admin.messages.index')->with('status', 'Message sent successfully.');
    }
}
