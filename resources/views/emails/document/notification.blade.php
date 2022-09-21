@component('mail::message')
# Dokumen Notifikasi

Reminder, untuk dokumen dengan detail :

No Dokumen      : {{ $doc->no_doc }} <br/>
Jenis Dokumen   : {{ $doc->type->name }} <br/>
Nama Dokumen    : {{ $doc->name }} <br/>
Nama Perusahaan : {{ $doc->company_name }} <br/>

Akan berakhir pada <b>{{ $doc->end_date->format('d-m-Y') }}</b> mohon untuk segera melakukan tindakan

@component('mail::button', ['url' => $url])
Detail Dokumen
@endcomponent

Terima kasih , <br>
{{ config('app.name') }}
@endcomponent
