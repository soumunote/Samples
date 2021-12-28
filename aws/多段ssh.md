```
ssh -i .ssh/aws.pem -o ProxyCommand='ssh -i .ssh/aws.pem -W %h:%p ec2-user@ec2-xxx-xxx-xxx-xxx.ap-northeast-1.compute.amazonaws.com' ec2-user@10.1.1.10 
```
