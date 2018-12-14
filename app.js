'use strict';

(function() {

  let axiosWrapper = (function() {
    let endpoint = "https://tools.sopress.net/iut/panier/api/";
    let token = "gilles@sopress.net";
    function setUrl(uri) {
      return endpoint + uri + "?token=" + encodeURIComponent(token);
    }
    return {
      get(uri) {
        return axios.get(setUrl(uri))
      },
      post(uri) {
        return axios.post(setUrl(uri))
      },
      put(uri) {
        return axios.put(setUrl(uri))
      },
      delete(uri) {
        return axios.delete(setUrl(uri))
      },
    };
  })();


  let panier = (function() {
    return {
      modules : {}
    }
  })();

  panier.modules.actions = (function() {
    
    /* Création de l'élément HTML pour afficher la photo
    (photo en background pour gérer facilement la taille et les proportions) */
    function photoProduit(produit) {
      return '<span class="photo" style="background-image:url('+produit.photo+')"></span>';
    }

    return {
      retirerProduitPanier(id_produit) {
        axiosWrapper.delete('cart/' + id_produit).then(function(response) {
          panier.modules.actions.construirePanier(response.data);
        })
      },
      /* Vider le panier */
      validerPanier() {
        let total = $('.ligne-produit').length;
        $('#panier').addClass('panier-loading');
        $('.ligne-produit').each(function(){
          axiosWrapper.put('cart/'+$(this).data('id')+'/buy').then((response) => {
            total--;
            $(this).addClass('produit-ok');
            if(total == 0) {
              setTimeout(function() { $('#panier').addClass('panier-ok'); }, 1000);
            }
          })
        });
      },
      /* Vider le panier */
      viderPanier() {
        axiosWrapper.delete('cart').then(function(response) {
          panier.modules.actions.construirePanier();
        })
      },
      /* Appel de l'api pour ajouter le produit id_produit au panier, puis mettre a jour le panier */
      ajouterAuPanier(id_produit) {
        axiosWrapper.post('cart/' + id_produit).then(function(response) {
          panier.modules.actions.construirePanier(response.data);
        })
      },
      /* Appel de l'api pour récupérer les produits du panier, puis construction du panier */
      chargerPanier() {
        axiosWrapper.get('cart').then(function(response) {
          panier.modules.actions.construirePanier(response.data);
        });
      },

      /* Appel de l'api pour récupérer les produits, puis construction de la liste */
      chargerProduits() {
        axiosWrapper.get('products').then(function(response) {
          panier.modules.actions.construireListeProduits(response.data);
        });
      },

      /* Construction du panier */
      construirePanier(produits=[]) {
        let total = 0;
        let html = [];
        produits.forEach(function(produit) {
          total += produit.prix
          html.push(
            `<div class="ligne-produit" data-id="${produit.id}">
              <b>${produit.nom}</b>
              <div>
                <span>${produit.qte}</span> &middot; 
                <span>${produit.prix} €</span> &middot; 
                <button data-id="${produit.id}" class="retirer-produit">🗑️</button>
              </div>
            </div>`
          );
        });
        $('#panier-content').html(html.join(''));
        $('#panier-total').html('Total : '+parseFloat(total).toFixed(2)+' €');
      },

      /* Construction de la liste des produits dans le DOM à partir d'un objet produits */
      construireListeProduits(produits) {
        let html = [];
        produits.forEach(function(produit) {
          html.push(
            `<div class="case-produit">
              <b>${produit.nom}</b>
              ${photoProduit(produit)}
              <span class="prix">${produit.prix} €</span>
              <p>${produit.description}</p>
              <button type="button" data-id="${produit.id}" class="ajouter-au-panier">Ajouter au panier</button>
            </div>`
          );
        });
        $('#products').html(html.join(''));
      }
    }
  })();

  panier.modules.app = (function() {
    return {
      start() {

        panier.modules.actions.chargerProduits();

        panier.modules.actions.chargerPanier();

        /** gestion des clics sur les boutons */
        $(document).on('click','.ajouter-au-panier',function() {
          let id = $(this).data('id');
          panier.modules.actions.ajouterAuPanier(id);
        });

        $(document).on('click','.retirer-produit',function() {
          let id = $(this).data('id');
          panier.modules.actions.retirerProduitPanier(id);
        });


        $(document).on('click','#empty',panier.modules.actions.viderPanier);
        $(document).on('click','#buy',panier.modules.actions.validerPanier);



      }
    }
  })();
  
  window.addEventListener("load", panier.modules.app.start)
})();