@component('mail::message')
# Dokumen Notifikasi

Reminder, untuk dokumen perlu diperhatikan :
@foreach($documents as $document) 
    {{ $document->no_doc }} {{ $document->name }} {{ $document->variety->name }} | {{ $document->due_status }}
@endforeach
@foreach($dueDocuments as $document) 
    {{ $document->no_doc }} {{ $document->name }} {{ $document->variety->name }} | {{ $document->due_status }}
@endforeach

Terima kasih , <br>
{{ config('app.name') }}
@endcomponent
