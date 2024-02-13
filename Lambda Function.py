import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Employee')

def lambda_handler(event, context):
    http_method = event.get('httpMethod', 'POST')  # Defaulting to POST if httpMethod is missing
    
    if http_method == 'POST':
        # Add item to the table
        item = {
            'Employee_ID': event['body']['Employee_ID'],
            'Name': event['body']['Name'],
            'age': event['body']['age'],
            'Salary': event['body']['Salary']
        }
        table.put_item(Item=item)
        return {
            'statusCode': 200,
            'body': "Data is created successfully"
        }
    elif http_method == 'DELETE':
        # Delete item from the table
        key = {
            'Employee_ID': event['queryStringParameters']['Employee_ID']
        }
        table.delete_item(Key=key)
        return {
            'statusCode': 200,
            'body': "Data is deleted successfully"
        }
    elif http_method == 'PUT':
        # Update item in the table
        key = {
            'Employee_ID': event['queryStringParameters']['Employee_ID']
        }
        update_expression = 'SET ' + ', '.join([f'{k} = :{k}' for k in event['body'].keys()])
        expression_attribute_values = {f':{k}': v for k, v in event['body'].items()}
        table.update_item(Key=key, UpdateExpression=update_expression, ExpressionAttributeValues=expression_attribute_values)
        return {
            'statusCode': 200,
            'body': "Data is updated successfully"
        }
    elif http_method == 'GET':
        # Get item from the table
        key = {
            'Employee_ID': event['queryStringParameters']['Employee_ID']
        }
        response = table.get_item(Key=key)
        item = response.get('Item', {})
        return {
            'statusCode': 200,
            'body': item
        }
    else:
        return {
            'statusCode': 400,
            'body': "Unsupported HTTP method"
        }
