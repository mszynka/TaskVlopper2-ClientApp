//TODO: Obsłużyć generowanie modeli z C#
$Classes(ServerApp.*.Models.*)[
    export class $Name{
        $Properties[
            public $name: $Type = $Type[$Default];]
    }
]