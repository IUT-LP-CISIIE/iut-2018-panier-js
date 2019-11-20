# Panier javascript

## Etape 1 : Liste de produits

Avec l'objet `products`, construire la liste des produits dans la page HTML dans le div #products à l'aide de jQuery. 
Le fichier app.js contient la structure de base du pattern module.
On va créer une méthode `panier.modules.actions.construireListeproduits` qui fera ce travail.

Utiliser le fichier styles.css pour mettre en forme la liste des produits.
Chaque article doit présenter les valeurs suivantes : nom du produit, description, image, prix.

## Etape 2 : Asynchrone

### Présentation sur Ajax

### API

Au lieu d'utiliser une liste de produits locales, nous allons plutôt la récupérer depuis une API
Accèder à l'API [https://tools.sopress.net/iut/panier/](https://tools.sopress.net/iut/panier/) et familiarisez vous avec les routes proposées
L'API requiert un token pour toutes les actions relatives au panier. On utilisera une adresse mail comme token.

### Accèder au "pen" ajaxQuery

Découverte d'une fonction en Javascript natif qui permet d'implémenter facilement un appel asynchrone (AJAX) vers l'API du panier.

### Découverte de Axios

Axios est une librairie open source très utile dans les appels asynchrones d'API en javascript. Il met à disposition un object `axios` dans le code.

Découverte de l'objet `axiosWrapper`

Intégrer le fichier AXIOS via son tag `<script>` dans le `<head>` de votre fichier `index.html`. 
Copier la définition du `axiosWrapper` dans votre fichier `app.js`.

Dans une nouvelle méthode `panier.modules.actions.chargerProduits`, apeller l'API `products` via `axiosWrapper.get()` de manière asynchrone pour récupérer la liste des produits depuis l'API, et réutiliser votre méthode `construireListeproduits`  pour construire la liste des produits

## Etape 3 : Constuire le panier

### Produits

 - Ajouter un bouton "Ajouter au panier" pour chaque produit. Via l'API `cart` en POST, faire en sorte que le produit concerné soit ajouté au panier en cliquant sur le bouton.
 - A l'aide de l'API `cart`en GET, récupérer la liste des produits qui sont dans le panier et afficher le contenu du panier dans le div #panier-content. Afficher aussi le montant total du panier.
 - faire en sorte que le panier soit mis à jour quand on ajoute un produit au panier
 - Pour chaque produit dans le panier, ajouter un bouton "Retirer" qui va retirer le produit du panier via l'API `cart/{pid}` en DELETE
 - Faire en sorte que le panier soit vidé au clic sur le bouton "Vider le panier" via l'API `cart/` en DELETE

## Etape 4 : validation asynchrone

### Principe

Nous devons commander les produits du panier en passant par l'API `car/{pid}/buy` en PUT. Il faut donc faire un appel de cette route API pour chaque produit dans le panier. L'API met un temps aléatoire pour retourner la réponse disant que la commande du produit est validée.

### Commander tous les produits du panier

Au clic sur le bouton "Commander", faites la commande de tous les produits du panier un par un. 
Dès qu'un réponse positive est reçue pour un des éléments du panier, afficher la ligne du produit correspondant en vert dans le panier.
Quand tous les produits sont commandés, afficher une alerte à l'utilisateur "Tous les produits sont commandés".

### Informations et consignes

 - Respectez le pattern module
 - Indenter et commenter le code
 - TD Rendu 

## Etape 5 : Bonus

IMPORTANT : Récupérez le dernière version du axiosWrapper à cette adresse : https://codepen.io/gfra/pen/WYVeLL?editors=0010
Pour passer des paramètres à une requète GET, faites comme ceci : 
`axiosWrapper.get('route?parametre=valeur&autreparametre=autrevaleur').then(...)`
Exemple : 

 - `axiosWrapper.get('products?page=3').then(...)` pour afficher la page 3
 - `axiosWrapper.get('products?field=prix&sort=desc').then(...)` pour trier sur le prix


### Options de tri

Ajouter la possibilité de trier la liste des produits sur le nom du produit (ordre croissant / décroissant) et sur le prix du produit en utilisant les paramètres `sort` et `field` de l'api `products`

### Pagination

L'API produits retourne par défaut les 6 premiers produits de la liste. Ajouter une navigation permettant d'aller à la page précédente / suivante en utilisant le paramètre `page` de l'api `products`
