@component('mail::message')
# Dokumen Notifikasi

Reminder, untuk dokument <b>{{ $no_doc }}</b> akan berakhir pada {{ $end_date }} mohon untuk segera melakukan tindakan

@component('mail::button', ['url' => $url])
Detail Dokumen
@endcomponent

Terima kasih , <br>
{{ config('app.name') }}
@endcomponent
