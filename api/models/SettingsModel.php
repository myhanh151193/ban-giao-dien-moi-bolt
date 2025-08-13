<?php

require_once __DIR__ . '/../core/Model.php';

class SettingsModel extends Model {
    protected $table = 'settings';
    
    public function getSetting($key, $default = null) {
        $sql = "SELECT setting_value, setting_type FROM settings WHERE setting_key = ?";
        $result = $this->fetchOne($sql, [$key]);
        
        if (!$result) {
            return $default;
        }
        
        $value = $result['setting_value'];
        
        // Cast value based on type
        switch ($result['setting_type']) {
            case 'number':
                return is_numeric($value) ? (int)$value : $default;
            case 'boolean':
                return filter_var($value, FILTER_VALIDATE_BOOLEAN);
            case 'json':
                return json_decode($value, true) ?: $default;
            default:
                return $value;
        }
    }
    
    public function setSetting($key, $value, $type = 'string', $description = null) {
        // Convert value based on type
        switch ($type) {
            case 'json':
                $value = json_encode($value);
                break;
            case 'boolean':
                $value = $value ? '1' : '0';
                break;
            default:
                $value = (string)$value;
        }
        
        $existing = $this->fetchOne("SELECT id FROM settings WHERE setting_key = ?", [$key]);
        
        if ($existing) {
            $sql = "UPDATE settings SET setting_value = ?, setting_type = ?, description = ? WHERE setting_key = ?";
            $params = [$value, $type, $description, $key];
        } else {
            $sql = "INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES (?, ?, ?, ?)";
            $params = [$key, $value, $type, $description];
        }
        
        return $this->execute($sql, $params);
    }
    
    public function getAllSettings() {
        $sql = "SELECT * FROM settings ORDER BY setting_key";
        $results = $this->fetchAll($sql);
        
        $settings = [];
        foreach ($results as $result) {
            $value = $result['setting_value'];
            
            // Cast value based on type
            switch ($result['setting_type']) {
                case 'number':
                    $value = is_numeric($value) ? (int)$value : 0;
                    break;
                case 'boolean':
                    $value = filter_var($value, FILTER_VALIDATE_BOOLEAN);
                    break;
                case 'json':
                    $value = json_decode($value, true) ?: [];
                    break;
            }
            
            $settings[$result['setting_key']] = [
                'value' => $value,
                'type' => $result['setting_type'],
                'description' => $result['description']
            ];
        }
        
        return $settings;
    }
    
    public function getPublicSettings() {
        // Only return settings that are safe to expose to frontend
        $publicKeys = [
            'site_name',
            'site_description',
            'contact_email',
            'contact_phone',
            'shipping_fee',
            'free_shipping_threshold',
            'currency',
            'items_per_page'
        ];
        
        $settings = [];
        foreach ($publicKeys as $key) {
            $settings[$key] = $this->getSetting($key);
        }
        
        return $settings;
    }
}
