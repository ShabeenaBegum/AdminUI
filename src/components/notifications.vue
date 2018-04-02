<template>
    <div class="modal docked docked-right in" id="notification-modal"
         tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Notification's
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="empty d-flex">
                        <img src="../assets/no_unread_notification.gif" alt="">
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .modal-lg {
        max-width: 30%;
    }
    .empty{
        align-items: center;
        justify-content: center;
    }
</style>
<script>
    export default {
        name: "notifications",
        mounted() {
            let vm = this;
            let modal = $('#notification-modal');
            modal.modal({ keyboard: false });
            modal.on('hidden.bs.modal', function (e) {
                vm.$emit('closed');
            });
        },
    }
</script>

<style scoped>

</style>