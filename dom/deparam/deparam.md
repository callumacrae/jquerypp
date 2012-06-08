@page jQuery.deparam
@parent jquerypp

`jQuery.deparam` compliments the native `jQuery.param` by converting valid querystrings to objects. If *convert* is `true`, values that look like numbers or booleans will be converted.

    $.deparam('first=john&last=Doe&phone[mobile]=1234567890&phone[home]=0987654321');
    // -> {
    //   first : "John", last : "Doe",
    //   phone : { mobile : "1234567890", home : "0987654321" }
    // }

## Demo

@demo jquery/dom/deparam/deparam.html
