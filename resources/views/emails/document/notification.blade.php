@component('mail::message')
# Dokumen Notifikasi

Reminder, untuk dokumen perlu diperhatikan :
@component('mail::table')
|No                       | Nama                  | Jenis                          | Status                      |
| ----------------------- |:---------------------:|:------------------------------:| ---------------------------:|
| @foreach($dueDocuments as $document) 
| {{ $document->no_doc }} | {{ $document->name }} | {{ $document->variety->name }} | {{ $document->due_status }} |
| @endforeach
|@foreach($documents as $document) 
| {{ $document->no_doc }} | {{ $document->name }} | {{ $document->variety->name }} | {{ $document->due_status }} |
|@endforeach
@endcomponent

Terima kasih , <br>
{{ config('app.name') }}
@endcomponent
