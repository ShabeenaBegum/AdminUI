export default {
    cols: [
        {
            name: "name",
            key: "name"
        },
        {
            name: "start Date",
            key: "start_date"
        },
        {
            name: "End Date",
            key: "end_date"
        },
        {
            name: "Day/time",
            key: "day_time"
        },
        {
            name: "Mentor",
            key: "mentor"
        },
        {
            name: "duration",
            key: "duration"
        },
        {
            name: "Rating",
            key: "rating"
        },
        {
            name: "Mode",
            key: "mode_of_training"
        },
        {
            name: "Sessions",
            key: "session"
        },
    ],
    filters: [
        {
            "display_name": "Batch Name",
            "enable": true,
            "key": "name",
            "operator": "eq",
            "value": "",
            options: [
                {
                    display_name: "is equal to",
                    operator: "eq",
                },
                {
                    display_name: "contains",
                    operator: "contains",
                }
            ]
        },
        {
            "display_name": "Batch Id",
            "enable": false,
            "operator": "eq",
            "key": "_id",
            "value": "",
            options: [
                {
                    display_name: "is equal to",
                    operator: "eq",

                },
                {
                    display_name: "contains",
                    operator: "contains",
                }
            ]
        }
    ],
}