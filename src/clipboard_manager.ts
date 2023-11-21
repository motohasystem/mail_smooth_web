export class ClipboardManager {
    static revokePermission() {
        // @ts-ignore
        navigator.permissions.query({ name: 'clipboard-write' }).then(function (result) {
            ClipboardManager.report(result.state);
        });
    }

    static report(state: PermissionState) {
        console.log('Permission: ' + state);
    }

}