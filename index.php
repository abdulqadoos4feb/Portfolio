<?php
if ($_SERVER['REQUEST_URI'] === '/date') {
	sleep(1);

    echo "Today's date is: " . date('Y-m-d H:i:s');
} else {
    echo "Welcome to the homepage";
}
