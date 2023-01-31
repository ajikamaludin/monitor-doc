<table>
    <thead>
        <tr>
            <th>group</th>
            <th>region</th>
            <th>nama perusahaan</th>
            <th>jenis</th>
            <th>kategori</th>
            <th>no</th>
            <th>nama</th>
            <th>penerbit</th>
            <th>tipe</th>
            <th>tanggal terbit</th>
            <th>tanggal jatuh tempo</th>
            <th>keterangan</th>
            <th>file</th>
            <th>status</th>
            <th>catatan</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            @foreach($collections as $collec)
            <td>{{ $collec["group"] }}</td>
            <td>{{ $collec["region"] }}</td>
            <td>{{ $collec["nama perusahaan"] }}</td>
            <td>{{ $collec["jenis"] }}</td>
            <td>{{ $collec["kategori"] }}</td>
            <td>{{ $collec["no"] }}</td>
            <td>{{ $collec["nama"] }}</td>
            <td>{{ $collec["penerbit"] }}</td>
            <td>{{ $collec["tipe"] }}</td>
            <td>{{ $collec["tanggal terbit"] }}</td>
            <td>{{ $collec["tanggal jatuh tempo"] }}</td>
            <td>{{ $collec["keterangan"] }}</td>
            <td>{{ $collec["file"] }}</td>
            <td>{{ $collec["status"] }}</td>
            <td>{{ $collec["catatan"] }}</td>
            @endforeach
        </tr>
    </tbody>
</table>