    /*--Page specific script --*/

$(function () {

    /* initialize the external events
     -----------------------------------------------------------------*/
    function init_events(ele) {
        ele.each(function () {

            // create an Event Object (https://fullcalendar.io/docs/v3/event-object)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            }

            // store the Event Object in the DOM element so we can get to it later
            /// almacenar el objeto de evento en el elemento DOM para que podamos acceder a él más tarde
            $(this).data('eventObject', eventObject)

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 1070,
                revert: true, // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            })

        })
    }

    init_events($('#external-events div.external-event'))

    /* initialize the calendar
     -----------------------------------------------------------------*/
    //Date for the calendar events (dummy data) /// Fecha de los eventos del calendario(datos ficticios)
    var date = new Date()
    var d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear()


    /////// ACA LLAMA A FULLCALENDAR PARA EMPEZAR A AGREGAR LOS EVENTOS ///////////

    $("#calendar").fullCalendar({
      header: {
        left: "prev,next today",
        center: "title",
        right: "month,agendaWeek,agendaDay"
      },
      buttonText: {
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día"
      },

      //Random default events ///  OBJETO PARA GUARDAR INFO SOBRE EL EVENTO
      events: [
        {
          id: 01, // agregue yo para identificar
          title: "(MEJOR) Ramirez Juan: Dolor en garganta y fiebre",
          description: 'first description', // Agrege yo para descripcion pero no se visualiza
          start: new Date(2019, m, 12, 12, 0),
          end: new Date(2019, m, 12, 13, 30),
          backgroundColor: "#f39c12", //yellow
          borderColor: "#f39c12" //yellow
        },
        {
          title: "Fernando garay: Turno por dolor de espalda y mareos",
          description: 'first description', // Agrege yo para descripcion pero no se visualiza
          start: new Date(y, m, 3),
          backgroundColor: "#f56954", //red
          borderColor: "#f56954" //red
        },
        {
          title: "Ojeda Lucia: apto medico",
          start: new Date(y, m, d + 1, 19, 0),
          end: new Date(y, m, d + 1, 22, 30),
          allDay: false,
          backgroundColor: "#00a65a", //Success (green)
          borderColor: "#00a65a" //Success (green)
        },
        {
          title: "Figuero Laura: dolor de oido y cuello",
          start: new Date(y, m, 28),
          end: new Date(y, m, 29),
          url: "http://google.com/",
          backgroundColor: "#3c8dbc", //Primary (light-blue)
          borderColor: "#3c8dbc" //Primary (light-blue)
        }
      ],
      
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar !!! //esto permite que las cosas se dejen caer en el calendario!!
      
      drop: function(date, allDay) {
        // this function is called when something is dropped // esta función se llama cuando se cae algo

        // recupera el objeto de evento almacenado del elemento descartado/soltado
        var originalEventObject = $(this).data("eventObject");

        // necesitamos copiarlo, para que varios eventos no tengan una referencia al mismo objeto
        var copiedEventObject = $.extend({}, originalEventObject);

        // asignarle la fecha que se informó
        copiedEventObject.start = date;
        copiedEventObject.allDay = allDay;
        copiedEventObject.backgroundColor = $(this).css("background-color");
        copiedEventObject.borderColor = $(this).css("border-color");

        // representa el evento en el calendario
        // el último argumento `true` determina si el evento "se queda" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
        $("#calendar").fullCalendar("renderEvent", copiedEventObject, true);

        // is the "remove after drop" checkbox checked?
        if ($("#drop-remove").is(":checked")) {
          // if so, remove the element from the "Draggable Events" list
          $(this).remove();
        }
      }
    });

    /* ADDING EVENTS */ /// * AGREGAR EVENTOS * /
    var currColor = '#3c8dbc' //Red by default
    //Color chooser button //// Botón selector de color
    var colorChooser = $('#color-chooser-btn')
    $('#color-chooser > li > a').click(function (e) {
        e.preventDefault()
        //Save color
        currColor = $(this).css('color')
        //Add color effect to button /// Añadir efecto de color al botón
        $('#add-new-event').css({ 'background-color': currColor, 'border-color': currColor })
    })
    $('#add-new-event').click(function (e) {
        e.preventDefault()
        //Get value and make sure it is not null /// Obtenga valor y asegúrese de que no sea nulo
        var val = $('#new-event').val()
        if (val.length == 0) {
            return
        }

        //Create events ////Create events
        var event = $('<div />')
        event.css({
            'background-color': currColor,
            'border-color': currColor,
            'color': '#fff'
        }).addClass('external-event')
        event.html(val)
        $('#external-events').prepend(event)

        //Add draggable funtionality //// Añadir funcionalidad arrastrable
        init_events(event)

        //Remove event from text input //// Eliminar evento de entrada de texto
        $('#new-event').val('')
    })

    ///////////////////////////////////////////////////////////////////////////////
    var calendar = new Calendar(calendarEl, {
        events: [
            {
                title: 'My Event',
                start: '2010-01-01',
                url: 'http://google.com/'
            }
            // other events here
        ],
        eventClick: function (info) {
            info.jsEvent.preventDefault(); // don't let the browser navigate

            if (info.event.url) {
                window.open(info.event.url);
            }
        }
        
    });
    ///////////////////////////////////////////////////////////////////////////////

})
