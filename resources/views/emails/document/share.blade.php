@component('mail::message')
# Berbagi Dokumen 

Saya membagikan dokumen dengan anda, untuk dokument <b>{{ $no_doc }}</b> akan berakhir pada {{ $end_date }} mohon untuk segera melakukan tindakan

@component('mail::button', ['url' => $url])
Detail Dokumen
@endcomponent

Terima kasih , <br>
{{ config('app.name') }}
@endcomponent
