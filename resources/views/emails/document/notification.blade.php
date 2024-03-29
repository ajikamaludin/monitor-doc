@component('mail::message')
# Dokumen Notifikasi

Reminder, untuk dokumen perlu diperhatikan :
@component('mail::table')
|No                       | Perusahaan            | Jenis                          | Status                      |
| ----------------------- |:---------------------:|:------------------------------:| ---------------------------:|
| @foreach($dueDocuments as $document) 
| {{ $document->no_doc }} | {{ $document->company->name }} | {{ $document->variety->name }} | {{ $document->due_status }} |
| @endforeach
|@foreach($documents as $document) 
| {{ $document->no_doc }} | {{ $document->company->name }} | {{ $document->variety->name }} | {{ $document->due_status }} |
|@endforeach
@endcomponent

Terima kasih , <br>
{{ config('app.name') }}
@endcomponent
