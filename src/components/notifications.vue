<template>
    <div class="modal docked docked-right in modal-slide" id="notification-modal"
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
        max-width: 30% !important;
    }
    .empty{
        align-items: center;
        justify-content: center;
    }
    .modal-slide .modal-dialog{
        animation:slide-modal 100ms ease-in;
    }
    @keyframes slide-modal{
        0%{
            opacity:0;
            transform:translate(100%,0)
        }
        100%{
            opacity:1;
            transform:translate(0,0)
        }
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