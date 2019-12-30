$Classes(*.Models.*)[
    export class $Name{
        $Properties[
            public $name: $Type = $Type[$Default];]
    }
]