<?php

class Database {
    private static $instance = null;
    private $connection = null;
    
    // Database configuration
    private $host;
    private $username;
    private $password;
    private $database;
    private $charset = 'utf8mb4';
    
    private function __construct() {
        $this->loadConfig();
        $this->connect();
    }
    
    private function loadConfig() {
        // Load from environment variables or use defaults
        $this->host = $_ENV['DB_HOST'] ?? 'localhost';
        $this->username = $_ENV['DB_USERNAME'] ?? 'root';
        $this->password = $_ENV['DB_PASSWORD'] ?? '';
        $this->database = $_ENV['DB_DATABASE'] ?? 'templatehub_db';
        
        // If .env file exists, load it
        $envFile = __DIR__ . '/../.env';
        if (file_exists($envFile)) {
            $this->loadEnvFile($envFile);
        }
    }
    
    private function loadEnvFile($filePath) {
        $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
                list($key, $value) = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value, '"\'');
                
                switch ($key) {
                    case 'DB_HOST':
                        $this->host = $value;
                        break;
                    case 'DB_USERNAME':
                        $this->username = $value;
                        break;
                    case 'DB_PASSWORD':
                        $this->password = $value;
                        break;
                    case 'DB_DATABASE':
                        $this->database = $value;
                        break;
                }
            }
        }
    }
    
    private function connect() {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->database};charset={$this->charset}";
            
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$this->charset}"
            ];
            
            $this->connection = new PDO($dsn, $this->username, $this->password, $options);
            
        } catch (PDOException $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    public function beginTransaction() {
        return $this->connection->beginTransaction();
    }
    
    public function commit() {
        return $this->connection->commit();
    }
    
    public function rollback() {
        return $this->connection->rollback();
    }
    
    // Prevent cloning
    private function __clone() {}
    
    // Prevent unserializing
    private function __wakeup() {}
}
