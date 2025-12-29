# -- Launch 
    docker build -t image_name .

    docker run -d -p 8080:80 --name image_name

# --- Deploy to docker hub
    1- Login to docker in cmd
        # docker login
    2- Tag the image
        # docker tag image_name:tag dockerhub_name/repository_name:name-your-tag
    3- Check images
        # docker images
    4- Push the image to Docker hub
        # docker push dockerhub_name/repository_name

# =========== Kubernetes =============
- Check kubernetes version
# kubectl version --client
- Check pods
# kubectl get nodes
- Check services
# kubectl get services
- Deploy
# kubectl apply -f deployment_name.yaml
- Checking erreur on yaml 
# kubectl apply -f deployment_name.yaml --dry-run=client
- Deleting 
    * deployment
# kubectl delete deployment deployment_name.yaml
    * service 
# kubectl delete service service_name.yaml
- Restaring deployment with configmap after editing
# kubectl rollout restart deployment deployment_name

    