export default {
    cols: [
        {
            name: "",
            key: "status"
        },
        {
            name: "Heading",
            key: "heading"
        },
        {
            name: "Course",
            key: "course_id"
        },
        {
            name: "Date / Time",
            key: "date_time"
        },
        {
            name: "Rating",
            key: "rating"
        },
        {
            name: "Attendance",
            key: "attendance"
        },
        {
            name: "Video View",
            key: "attendance"
        },
        {
            name: "Recording",
            key: "recording"
        },
        {
            name: "Mentor",
            key: "mentor"
        },
        {
            name: "Students",
            key: "no_of_students"
        },
    ],
    filters: [
        {
            "display_name": "Course",
            "enable": true,
            "key": "course_id",
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
            "display_name": "Batch",
            "enable": false,
            "operator": "eq",
            "key": "batch_id",
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
            "display_name": "Session Id",
            "enable": false,
            "operator": "eq",
            "key": "session_id",
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
        },
        {
            "display_name": "Status",
            "enable": false,
            "operator": "eq",
            "key": "status",
            "value": "",
            options: [
                {
                    display_name: "is equal to",
                    operator: "eq",

                }
            ]
        },
        {
            "display_name": "Rating",
            "enable": false,
            "operator": "eq",
            "key": "rating",
            "value": "",
            options: [
                {
                    display_name: "is equal to",
                    operator: "eq",

                },
                {
                    display_name: "greater than",
                    operator: "gt",
                },
                {
                    display_name: "less than than",
                    operator: "lt",
                },
                {
                    display_name: "between ( 2 values sep by , )",
                    operator: "bt",
                }
            ]
        },
        {
            "display_name": "Attendance",
            "enable": false,
            "operator": "eq",
            "key": "attendance",
            "value": "",
            options: [
                {
                    display_name: "is equal to",
                    operator: "eq",
                }
            ]
        },
        {
            "display_name": "Video View",
            "enable": false,
            "operator": "eq",
            "key": "video_view",
            "value": "",
            options: [
                {
                    display_name: "is equal to",
                    operator: "eq",

                },
                {
                    display_name: "greater than",
                    operator: "gt",
                },
                {
                    display_name: "less than than",
                    operator: "lt",
                },
                {
                    display_name: "between ( 2 values sep by , )",
                    operator: "bt",
                }
            ]
        },

    ],
}
