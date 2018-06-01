export default {
    cols: [
        {
            name: "title",
            key: "title"
        },
        {
            name: "Product",
            key: "product_category"
        },
        {
            name: "category",
            key: "event_category"
        },
        {
            name: "Cost",
            key: "event_cost"
        },
        
        {
            name: "status",
            key: "status"
        },

        {
            name: "action",
            key: "action_edit"
        },
        // {
        //     name: "action",
        //     key: "action_review"
        // },        // {
        //     name: "End Date",
        //     key: "end_date"
        // },
        // {
        //     name: "Day/time",
        //     key: "day_time"
        // },
        // {
        //     name: "Mentor",
        //     key: "mentor"
        // },
        // {
        //     name: "duration",
        //     key: "duration"
        // },
        // {
        //     name: "Rating",
        //     key: "rating"
        // },
        // {
        //     name: "Mode",
        //     key: "mode_of_training"
        // },
        // {
        //     name: "Students",
        //     key: "no_of_students"
        // },
        // {
        //     name: "Sessions",
        //     key: "session"
        // },
    ],
    filters: [
        {
            "display_name": "Title",
            "enable": true,
            "key": "title",
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
            "display_name": "Topic",
            "enable": false,
            "operator": "eq",
            "key": "topic",
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
