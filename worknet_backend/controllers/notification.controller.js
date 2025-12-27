// notification.controller.js
const { v4: uuidv4 } = require('uuid');

class NotificationController {
    constructor() {
        this.notifications = [];
    }

    // -----------------------------
    // Helpers
    // -----------------------------
    success(data) {
        return { success: true, data };
    }

    error(message) {
        return { success: false, error: message };
    }

    // -----------------------------
    // Controller Methods
    // -----------------------------

    createNotification(req, res) {
        const { user_id, title, message, type = 'info', action_url, related_entity_type, related_entity_id } = req.body;

        if (!user_id || !title || !message) {
            return res.status(400).json(this.error("Missing required fields"));
        }

        const notif = {
            _id: uuidv4(),
            user_id,
            title,
            message,
            type,
            action_url: action_url || null,
            related_entity_type: related_entity_type || null,
            related_entity_id: related_entity_id || null,
            is_read: false,
            created_at: new Date().toISOString()
        };

        this.notifications.push(notif);

        return res.status(201).json(this.success(notif));
    }

    getUserNotifications(req, res) {
        const { user_id } = req.params;
        if (!user_id) return res.status(400).json(this.error("User ID is required"));

        let userNotifications = this.notifications.filter(n => n.user_id === user_id);

        // Optional query filters
        const { is_read, limit, page } = req.query;

        if (is_read !== undefined) {
            const readFlag = is_read === 'true';
            userNotifications = userNotifications.filter(n => n.is_read === readFlag);
        }

        const total = userNotifications.length;
        let paginated = userNotifications;
        if (limit || page) {
            const l = parseInt(limit) || total;
            const p = parseInt(page) || 1;
            paginated = userNotifications.slice((p - 1) * l, p * l);
        }

        return res.json(this.success({ total, notifications: paginated }));
    }

    markNotificationAsRead(req, res) {
        const { id } = req.params;
        const notif = this.notifications.find(n => n._id === id);

        if (!notif) return res.status(404).json(this.error("Notification not found"));

        notif.is_read = true;
        return res.json(this.success(notif));
    }

    deleteNotification(req, res) {
        const { id } = req.params;
        const index = this.notifications.findIndex(n => n._id === id);

        if (index === -1) return res.status(404).json(this.error("Notification not found"));

        this.notifications.splice(index, 1);
        return res.json(this.success(true));
    }

    clearUserNotifications(req, res) {
        const { user_id } = req.params;
        const before = this.notifications.length;
        this.notifications = this.notifications.filter(n => n.user_id !== user_id);
        const deleted = before - this.notifications.length;
        return res.json(this.success({ deleted }));
    }
}

module.exports = new NotificationController();
