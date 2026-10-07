<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ApiDocumentationController extends Controller
{
    public function spec(): JsonResponse
    {
        return response()->json($this->definition());
    }

    public function ui(): Response
    {
        $specUrl = url('/api/openapi.json');
        $html = <<<HTML
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Tarwiqa API Documentation</title>
            <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
        </head>
        <body>
            <div id="swagger-ui"></div>
            <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
            <script>
                window.onload = () => window.ui = SwaggerUIBundle({
                    url: '{$specUrl}',
                    dom_id: '#swagger-ui',
                    deepLinking: true,
                    displayRequestDuration: true,
                    presets: [SwaggerUIBundle.presets.apis],
                    layout: 'BaseLayout'
                });
            </script>
        </body>
        </html>
        HTML;

        return response($html)->header('Content-Type', 'text/html; charset=UTF-8');
    }

    private function definition(): array
    {
        return [
            'openapi' => '3.0.3',
            'info' => [
                'title' => 'Tarwiqa API',
                'version' => '1.0.0',
                'description' => 'API documentation for the Tarwiqa customer application.',
            ],
            'servers' => [['url' => url('/api/v1')]],
            'tags' => [
                ['name' => 'Cart'],
                ['name' => 'Notifications'],
                ['name' => 'Banners'],
                ['name' => 'Support'],
            ],
            'components' => [
                'securitySchemes' => [
                    'bearerAuth' => [
                        'type' => 'http',
                        'scheme' => 'bearer',
                        'bearerFormat' => 'JWT',
                    ],
                ],
                'schemas' => [
                    'CartItemInput' => [
                        'type' => 'object',
                        'required' => ['item_type', 'item_id'],
                        'properties' => [
                            'item_type' => ['type' => 'string', 'enum' => ['service', 'product', 'package']],
                            'item_id' => ['type' => 'integer', 'example' => 1],
                            'quantity' => ['type' => 'integer', 'minimum' => 1, 'maximum' => 20, 'default' => 1],
                        ],
                    ],
                    'CartItemUpdate' => [
                        'type' => 'object',
                        'required' => ['quantity'],
                        'properties' => ['quantity' => ['type' => 'integer', 'minimum' => 1, 'maximum' => 20]],
                    ],
                    'SupportTicketInput' => [
                        'type' => 'object',
                        'required' => ['subject', 'details'],
                        'properties' => [
                            'subject' => ['type' => 'string', 'maxLength' => 255],
                            'details' => ['type' => 'string', 'maxLength' => 5000],
                            'channel' => ['type' => 'string', 'example' => 'mobile'],
                            'order_id' => ['type' => 'integer', 'nullable' => true],
                        ],
                    ],
                ],
            ],
            'paths' => array_merge(
                $this->additionalPaths(), [
                '/cart' => [
                    'get' => $this->operation('Cart', 'Get the authenticated customer cart.', ['200' => $this->response('Cart retrieved successfully.')]),
                    'delete' => $this->operation('Cart', 'Remove all items from the authenticated customer cart.', ['200' => $this->response('Cart cleared successfully.')]),
                ],
                '/cart/items' => [
                    'post' => $this->operation('Cart', 'Add a service, product, or package to the cart.', [
                        '201' => $this->response('Item added to cart.'),
                        '422' => $this->response('Validation failed.'),
                    ], ['requestBody' => $this->jsonBody('CartItemInput')]),
                ],
                '/cart/items/{item}' => [
                    'put' => $this->operation('Cart', 'Update cart item quantity.', ['200' => $this->response('Cart item updated successfully.')], [
                        'parameters' => [$this->pathParameter('item')],
                        'requestBody' => $this->jsonBody('CartItemUpdate'),
                    ]),
                    'delete' => $this->operation('Cart', 'Remove one cart item.', ['200' => $this->response('Cart item removed successfully.')], [
                        'parameters' => [$this->pathParameter('item')],
                    ]),
                ],
                '/notifications' => [
                    'get' => $this->operation('Notifications', 'List authenticated customer notifications.', ['200' => $this->response('Notifications retrieved successfully.')], [
                        'parameters' => [['name' => 'per_page', 'in' => 'query', 'schema' => ['type' => 'integer', 'minimum' => 1, 'maximum' => 50]]],
                    ]),
                ],
                '/notifications/{notification}/read' => [
                    'patch' => $this->operation('Notifications', 'Mark one notification as read.', ['200' => $this->response('Notification marked as read.')], [
                        'parameters' => [['name' => 'notification', 'in' => 'path', 'required' => true, 'schema' => ['type' => 'string', 'format' => 'uuid']]],
                    ]),
                ],
                '/notifications/read-all' => [
                    'patch' => $this->operation('Notifications', 'Mark all notifications as read.', ['200' => $this->response('Notifications marked as read.')]),
                ],
                '/banners' => [
                    'get' => $this->operation('Banners', 'List active home page banners.', ['200' => $this->response('Banners retrieved successfully.')], authenticated: false),
                ],
                '/support/tickets' => [
                    'post' => $this->operation('Support', 'Create a support ticket for the authenticated customer.', ['201' => $this->response('Support ticket created successfully.')], [
                        'requestBody' => $this->jsonBody('SupportTicketInput'),
                    ]),
                ],
            ]),
        ];
    }

    private function additionalPaths(): array
    {
        return [
            '/auth/login' => ['post' => $this->operation('Authentication', 'Authenticate a customer.', ['200' => $this->response('Login successful.')], authenticated: false)],
            '/auth/social-login' => ['post' => $this->operation('Authentication', 'Authenticate with a social provider.', ['200' => $this->response('Social login successful.')], authenticated: false)],
            '/auth/register' => ['post' => $this->operation('Authentication', 'Register a customer account.', ['201' => $this->response('Registration successful.')], authenticated: false)],
            '/auth/profile' => [
                'get' => $this->operation('Authentication', 'Get the authenticated customer profile.', ['200' => $this->response('Profile retrieved successfully.')]),
                'put' => $this->operation('Authentication', 'Update the authenticated customer profile.', ['200' => $this->response('Profile updated successfully.')]),
                'delete' => $this->operation('Authentication', 'Delete the authenticated customer profile.', ['200' => $this->response('User deleted successfully.')]),
            ],
            '/cities' => ['get' => $this->operation('Catalog', 'List active cities.', ['200' => $this->response('Cities retrieved successfully.')], authenticated: false)],
            '/service-types' => ['get' => $this->operation('Catalog', 'List active service types.', ['200' => $this->response('Service types retrieved successfully.')], authenticated: false)],
            '/service-categories/{type_id}' => ['get' => $this->operation('Catalog', 'List categories for a service type.', ['200' => $this->response('Categories retrieved successfully.')], [
                'parameters' => [$this->pathParameter('type_id')],
            ], false)],
            '/services' => ['get' => $this->operation('Catalog', 'List active services with optional category and city filters.', ['200' => $this->response('Services retrieved successfully.')], authenticated: false)],
            '/services/{service_id}' => ['get' => $this->operation('Catalog', 'Get one service.', ['200' => $this->response('Service retrieved successfully.')], [
                'parameters' => [$this->pathParameter('service_id')],
            ], false)],
            '/products' => ['get' => $this->operation('Catalog', 'List active products with optional category and city filters.', ['200' => $this->response('Products retrieved successfully.')], authenticated: false)],
            '/products/{product_id}' => ['get' => $this->operation('Catalog', 'Get one product.', ['200' => $this->response('Product retrieved successfully.')], [
                'parameters' => [$this->pathParameter('product_id')],
            ], false)],
            '/order/checkout' => ['post' => $this->operation('Orders', 'Create an order from selected services and products.', ['201' => $this->response('Order created successfully.')])],
            '/order/cancel' => ['put' => $this->operation('Orders', 'Cancel an authenticated customer order.', ['200' => $this->response('Order cancelled successfully.')])],
            '/orders' => ['get' => $this->operation('Orders', 'List the authenticated customer orders.', ['200' => $this->response('Orders retrieved successfully.')])],
            '/orders/statistics' => ['get' => $this->operation('Orders', 'Get authenticated customer order statistics.', ['200' => $this->response('Order statistics retrieved successfully.')])],
            '/orders/{order_id}' => ['get' => $this->operation('Orders', 'Get one authenticated customer order.', ['200' => $this->response('Order retrieved successfully.')], [
                'parameters' => [$this->pathParameter('order_id')],
            ])],
            '/wallet' => ['get' => $this->operation('Wallet', 'Get the authenticated customer wallet.', ['200' => $this->response('Wallet retrieved successfully.')])],
            '/wallet/transactions' => ['get' => $this->operation('Wallet', 'List wallet transactions.', ['200' => $this->response('Transactions retrieved successfully.')])],
            '/wallet/charge' => ['post' => $this->operation('Wallet', 'Start a wallet charge.', ['201' => $this->response('Wallet charge started successfully.')])],
            '/addresses' => [
                'get' => $this->operation('Addresses', 'List the authenticated customer addresses.', ['200' => $this->response('Addresses retrieved successfully.')]),
                'post' => $this->operation('Addresses', 'Create a customer address.', ['201' => $this->response('Address stored successfully.')]),
            ],
            '/addresses/{address}' => [
                'get' => $this->operation('Addresses', 'Get a customer address.', ['200' => $this->response('Address retrieved successfully.')], ['parameters' => [$this->pathParameter('address')]]),
                'put' => $this->operation('Addresses', 'Update a customer address.', ['200' => $this->response('Address updated successfully.')], ['parameters' => [$this->pathParameter('address')]]),
                'patch' => $this->operation('Addresses', 'Update a customer address.', ['200' => $this->response('Address updated successfully.')], ['parameters' => [$this->pathParameter('address')]]),
                'delete' => $this->operation('Addresses', 'Delete a customer address.', ['200' => $this->response('Address deleted successfully.')], ['parameters' => [$this->pathParameter('address')]]),
            ],
            '/paymob/webhook' => ['post' => $this->operation('Payments', 'Receive a Paymob payment webhook.', ['200' => $this->response('Webhook accepted.')], authenticated: false)],
            '/paymob/redirect' => ['get' => $this->operation('Payments', 'Handle the Paymob payment redirect.', ['302' => $this->response('Payment redirect.')], authenticated: false)],
        ];
    }

    private function operation(string $tag, string $summary, array $responses, array $extra = [], bool $authenticated = true): array
    {
        $operation = [
            'tags' => [$tag],
            'summary' => $summary,
            'responses' => $responses,
        ];

        if ($authenticated) {
            $operation['security'] = [['bearerAuth' => []]];
        }

        return array_merge($operation, $extra);
    }

    private function response(string $description): array
    {
        return ['description' => $description];
    }

    private function jsonBody(string $schema): array
    {
        return ['required' => true, 'content' => ['application/json' => ['schema' => ['$ref' => "#/components/schemas/{$schema}"]]]];
    }

    private function pathParameter(string $name): array
    {
        return ['name' => $name, 'in' => 'path', 'required' => true, 'schema' => ['type' => 'integer', 'minimum' => 1]];
    }
}
