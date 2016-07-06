<?php
	
	$destination = "vincent@rocket-design.ca"; // email address of destination  arescloutier@outlook.com 
	
	error_reporting (E_ALL ^ E_NOTICE);

	function validate_email($email)
	{
		$regex = '/([a-z0-9_.-]+)'. 
		'@'. 
		'([a-z0-9.-]+){2,255}'. 
		'.'. 
		'([a-z]+){2,10}/i'; 
		
		if($email == '') 
			return false;
		else
			$eregi = preg_replace($regex, '', $email);
		return empty($eregi) ? true : false;
	}

	$post = (!empty($_POST)) ? true : false;
	
	if($post)
	{
		$name 	 = stripslashes($_POST['nom']);
		$email 	 = trim($_POST['courriel']);
		$subject = trim($_POST['sujet']);
		$message = stripslashes($_POST['message']);
	
		$error = '';
	
		if(!$name)
			$error .= 'Nom obligatoire!';
	
		if(!$email)
			$error .= 'Courriel requis!';
	
		if($email && !validate_email($email))
			$error .= 'L adresse courriel n est pas valide!';
	
		if(!$message)
			$error .= "S'il vous plaît entrer votre message!";
	
		if(!$error)
		{
			$mail = @mail($destination, $subject, $message,
				 "From: ".$name." <".$email.">\r\n"
				."Reply-To: ".$email."\r\n"
				."Return-Path: " .$email. "\r\n"
				."MIME-Version: 1.0\r\n"	
				."Content-type: text/html; charset=UTF-8\r\n");
			
			if($mail){
				echo 'OK';
			}else{
				echo 'Impossible d envoyer votre courriel!';
			}
		}
		else
			echo $error;
	}

?>