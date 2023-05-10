profile:=lightning-talk

deploy_infrastructure:
	@cd infrastructure && npx cdk deploy \
    		lightning-talk-infrastructure \
    		--profile ${profile} --require-approval never

deploy_frontend:
	@cd frontend && npm run build
	@aws s3 sync frontend/build s3://lightning-talk-frontend --delete --profile ${profile}
	@aws cloudfront create-invalidation \
		--distribution-id `aws cloudfront list-distributions --profile ${profile} | jq -r '.DistributionList.Items[] | select(.Comment=="lightning talk distribution") | .Id'` \
		--profile ${profile} \
		--paths "/*"